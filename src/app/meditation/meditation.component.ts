import { Component } from '@angular/core';
import { MeditationService } from './meditation.service';
import { UserService } from '../user/user.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import { AppState } from '../app.service';
import * as StableInterval from 'stable-interval';

/**
 * Component for the meditation tab inside home.
 */
@Component({
  selector: 'meditation',
  template: require('./meditation.component.html'),
  styles: [
    require('./meditation.component.css')
  ]
})
export class MeditationComponent {

  // user profile
  profile;

  // alarm bell
  bell = new Audio();
  timer;
  staticBell = null;

  // meditation data
  activeMeditations: Object[];
  finishedMeditations: Object[];
  meditationSubscription;
  meditationSocket;
  ownSession = null;
  loadedInitially: boolean = false;
  lastUpdated;
  sending: boolean = false;
  lastMeditationSession;

  // form data
  walking: string = '';
  sitting: string = '';

  // current User data
  currentMeditation: string = '';
  userWalking: boolean = false;
  userSitting: boolean = false;

  loadingLike: boolean = false;

  constructor(
    public meditationService: MeditationService,
    public userService: UserService,
    public router: Router,
    public appState: AppState
  ) {
    this.polluteWithLastSession();
  }

  /**
   * Method will be fired when the tab in home is activated.
   */
  onActivated() {
    this.polluteWithLastSession();
  }

  /**
   * Set current walking and sitting inputs to last values.
   */
  polluteWithLastSession() {
    this.walking = window.localStorage.getItem('lastWalking');
    this.sitting = window.localStorage.getItem('lastSitting');
  }

  /**
   * Checks if the current user is meditating sets the session if found.
   */
  checkOwnSession() {
    this.ownSession = this.activeMeditations && this.activeMeditations
      .filter(val => (<any>val).user._id === this.getUserId())
      .reduce((prev, val) => val, null);

    if (this.ownSession){
      this.appState.set('isMeditating', true);
    } else {
      this.appState.set('isMeditating', false);
    }
  }

  /**
   * Start polling observable
   */
  pollMeditations(): Observable<Response> {
    return Observable.interval(1000)
      .filter(() => {
        if (!this.lastUpdated) {
          return true;
        }

        // only update when a minute is reached
        const duration = moment.duration(moment().diff(this.lastUpdated));
        return duration.asMinutes() > 1;
      })
      .switchMap(() => this.meditationService.getRecent())
      .map(res => (<any>res).json())
      .retry();
  }

  /**
   * Returns the user id stored in localStorage
   */
  getUserId(): string {
    return window.localStorage.getItem('id');
  }

  /**
   * Filters the response by active and finished meditations
   * @param {Observable<any>} res
   */
  subscribe(obs: Observable<any>): Subscription {
    return obs.subscribe(res => {
      this.loadedInitially = true;
      this.lastUpdated = moment();

      // reset title
      this.appState.set('title', null);

      this.activeMeditations = res.filter(data => {
        // set title to own meditation session state
        if (data.user._id === this.getUserId() && (data.walkingLeft + data.sittingLeft) > 0) {
          this.appState.set(
            'title',
            (this.userWalking ? 'Walking' : 'Sitting') +
            ' Meditation (' + (data.walkingLeft ? data.walkingLeft : data.sittingLeft) + 'm left)'
          );
        }

        // updated latest meditation session date
        if (!this.lastMeditationSession
          || moment(data.createdAt) > this.lastMeditationSession) {
          this.lastMeditationSession = moment(data.createdAt);
        }

        // also checking here if walking or sitting finished for the current user
        // to play a sound. Doing it inside the filter to reduce iterations.
        if (data._id === this.currentMeditation && this.userWalking && !data.walkingLeft){
          this.userWalking = false;
        } else if (data._id === this.currentMeditation && this.userSitting && !data.sittingLeft) {
          this.userSitting = false;
        }

        // actual filtering for active meditations
        return data.sittingLeft + data.walkingLeft > 0;
      });

      this.finishedMeditations = res.filter(data => {
        return data.sittingLeft + data.walkingLeft === 0;
      });

      this.checkOwnSession();

      // set timer again if page was refreshed
      if (typeof(this.timer) === 'undefined' && !this.staticBell && this.ownSession) {
        console.log(this.ownSession.walkingLeft, this.ownSession.sittingLeft);
        this.setTimer(this.ownSession.walkingLeft, this.ownSession.sittingLeft);
      }
    },
    err => {
      if (err.status === 401) {
        this.userService.logout();
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Method for querying recent meditations
   */
  loadMeditations(): void {
    console.log(this.timer);
    this.subscribe(
      this.meditationService.getRecent()
      .map(res => res.json())
    );
  }

  /**
   * Sends new meditation session
   */
  sendMeditation(evt) {
    evt.preventDefault();
    let walking = this.walking ? parseInt(this.walking, 10) : 0;
    let sitting = this.sitting ? parseInt(this.sitting, 10) : 0;

    if (!walking && !sitting)
      return;

    // saves last meditation data to localStorage
    window.localStorage.setItem('lastWalking', this.walking);
    window.localStorage.setItem('lastSitting', this.sitting);

    this.sending = true;
    this.meditationService.post(walking, sitting)
      .map(res => res.json())
      .subscribe(res => {
        this.currentMeditation = res._id;
        this.loadMeditations();
        this.sending = false;
      }, (err) => {
        console.error(err);
        this.sending = false;
      });

    // Set user status
    this.userWalking = walking > 0;
    this.userSitting = sitting > 0;

    // Activate bell for mobile users by playing a blank mp3 file
    this.bell.src = 'assets/audio/halfsec.mp3';
    this.bell.play();
    setTimeout(function() {
      this.bell.src = this.profile.sound ? this.profile.sound : '';
    }.bind(this), 1000);

    this.setTimer(walking, sitting);
    this.appState.set('isMeditating', true);
  }

  /**
   * Method for liking meditation sessions of other users.
   */
  like() {
    this.loadingLike = true;
    this.meditationService.like()
      .subscribe(
        () => {
          this.loadingLike = false;
          this.profile.lastLike = moment();
        },
        () => this.loadingLike = false
      );
  }

  /**
   * Method for starting a meditation timer in the user's browser
   * @param {number} time for walking in milliseconds
   * @param {number} time for sitting in milliseconds
   */
  setTimer(walking: number, sitting: number) {

    if (this.profile && this.profile.staticTimer) {
      this.staticBell = new Audio();
      this.staticBell.onerror = () => { this.staticBell = null; };

      const bellName = this.profile.sound ? this.profile.sound.replace('.mp3', '') : 'bell1';
      if (!walking || !sitting) {
        this.staticBell.src = 'http://home/sebastian/Dokumente/Code/static-bells/out/' + bellName + '/' + (!walking ? sitting : walking) + '.ogg';
      } else {
        this.staticBell.src = '/home/sebastian/Dokumente/Code/static-bells/out/' + bellName + '/' + walking + '_' + sitting + '.ogg';
      }
    }


    if (this.staticBell) {
      this.staticBell.play();
    } else {
      // fallback to default timer
      console.log('Fallback');
      const timerStart = moment();

      let walkingDone = walking > 0 ? false : true;
      let sittingDone = sitting > 0 ? false : true;

      this.timer = new StableInterval().set(() => {
        let diff = moment().diff(timerStart, 'minutes');
        console.log(diff, timerStart)
        if (!walkingDone && diff >= walking) {
          walkingDone = true;
          this.playSound();
        }

        if (!sittingDone && diff >= sitting) {
          sittingDone = true;
          this.playSound();
        }

        if (walkingDone && sittingDone) {
          this.timer.clear();
        }
      }, 5000);

    }
  }

  /**
   * Play sound. Needed for bells.
   */
  playSound() {
    if (this.bell){
      this.bell.currentTime = 0;
      this.bell.play();
    }
  }

  /**
   * Stopping active meditation session.
   */
  stop() {
    if (!confirm(
      'Are you sure you want to stop your session?'
    )) {
      return;
    }

    this.meditationService.stop()
      .subscribe(() => {
        this.userWalking = false;
        this.userSitting = false;
        this.loadMeditations();
      }, err => {
        console.error(err);
      });

    if (typeof(this.timer) !== 'undefined') {
      this.timer.clear();
    }

    this.appState.set('isMeditating', false);
  }

  ngOnInit() {
    // getting chat data instantly
    this.loadMeditations();

    // subscribe for an refresh interval after
    this.meditationSubscription = this.subscribe(
      this.pollMeditations()
    );

    // initialize websocket for instant data
    this.meditationSocket = this.meditationService.getSocket()
      .subscribe(() => {
        this.loadMeditations();
      });

    // Get user profile data (for preferred sound and last meditation time)
    this.userService.getProfile()
      .map(res => res.json())
      .subscribe(
        data => {
          this.profile = data;
          this.profile.lastLike = this.profile.lastLike ? moment(this.profile.lastLike) : null;
        },
        err => console.error(err)
      );
  }

  /**
   * Rounds a number. Math.round isn't available in the template.
   * Needed for meditation progress.
   *
   * @param  {number} val Value to round
   * @return {number}     Rounded value
   */
  round(val: number): number {
    return Math.round(val);
  }

  ngOnDestroy() {
    this.meditationSubscription.unsubscribe();
    this.meditationSocket.unsubscribe();
  }
}
