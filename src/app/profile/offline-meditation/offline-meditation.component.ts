import { Component } from '@angular/core';
import { MeditationService } from '../../meditation/meditation.service';
import * as moment from 'moment';

/**
 * Component for logging offline meditations
 */
@Component({
  selector: 'offline-meditation',
  template: require('./offline-meditation.html'),
  styles: [
    require('./offline-meditation.css')
  ]
})
export class OfflineMeditation {
  
  walking: string = '';
  sitting: string = '';
  date: string = '';
  time: string = '';
  sending: boolean = false;

  constructor(public meditationService: MeditationService) {}

  sendMeditation(evt) {
    evt.preventDefault();

    let walking = this.walking ? parseInt(this.walking, 10) : 0;
    let sitting = this.sitting ? parseInt(this.sitting, 10) : 0;
    let datetime = moment(this.date + 'T' + this.time).utc().toDate();

    if ((!walking && !sitting) || isNaN(datetime.getTime()))
      return;

    this.sending = true;
    this.meditationService.post(walking, sitting, datetime)
      .map(res => res.json())
      .subscribe(res => {
        this.sending = false;
      }, (err) => {
        console.error(err);
        this.sending = false;
      });
  }
}
