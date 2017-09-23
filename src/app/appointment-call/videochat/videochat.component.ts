import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { VideoChatService } from './videochat.service';
import { MessageListEntryComponent } from '../../message/list-entry/message-list-entry.component';
import * as moment from 'moment';
import * as SimplePeer from 'simple-peer';

@Component({
  selector: 'videochat',
  templateUrl: './videochat.component.html',
  styleUrls: [
    './videochat.component.styl',
    '../../message/list-entry/message-list-entry.component.styl',
    './loading-animation.css'
  ],
  providers: [VideoChatService]
})
export class VideoChatComponent implements OnInit, OnDestroy {
  @Input() appointment;

  @Output() error: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() ended: EventEmitter<Object> = new EventEmitter<Object>();

  @ViewChild('localVideo', {read: ElementRef}) localVideo: ElementRef;
  @ViewChild('remoteVideo', {read: ElementRef}) remoteVideo: ElementRef;

  rtcInitiator: boolean;
  rtcStream; // => stream from local webcam
  rtcPeer;

  supportCamera: boolean;
  supportMic: boolean;

  cameraOn = true;
  micOn = true;

  // same properties as above only for opponent
  opponentCamera = true;
  opponentMic = true;
  opponentProfile;

  connected: boolean;

  currentMessage: string;
  messages: Object[] = [];

  // UI modelss
  loadingMessage = 'Initializing';

  constructor(public videochatService: VideoChatService) {
    if (!SimplePeer.WEBRTC_SUPPORT) {
      this.error.emit('Your browser does not support WebRTC.');
    }
  }

  /**
   * Exit call
   */
  exit(gracefully = true): void {
    if (!this.connected) {
      return;
    }

    // destroy RTC connection
    if (this.rtcPeer) {
      this.rtcPeer.destroy();
      this.rtcPeer = null;
    }

    // stop stream from local webcam
    if (this.rtcStream) {
      this.rtcStream.getTracks().map(track => track.stop());
    }

    if (gracefully) {
      this.ended.emit();
    }

    this.videochatService.leave(gracefully);
  }

  /**
   * Ask for media permission and then try to join appointment
   */
  getMediaPermission(video: boolean = true): Promise<any> {
    return navigator.mediaDevices.getUserMedia({
      video: video,
      audio: true
    });
  }

  /**
   * Open a P2P WebRTC connection for transmitting video, audio and data
   */
  connect(): void {
    if (!this.rtcStream) {
      this.getMediaPermission();
    }

    this.connected = false;
    this.loadingMessage = 'Connecting';

    this.rtcPeer = new SimplePeer({
      initiator: this.rtcInitiator,
      stream: this.rtcStream,
      reconnectTimer: 3000
    });

    // specify events

    this.rtcPeer.on('signal', data => this.videochatService.signal(data));

    this.rtcPeer.on('connect', () => this.loadingMessage = 'Connected. Waiting for stream.');

    this.rtcPeer.on('stream', stream => {
      console.log('onstream', stream);
      // create fresh HTML video element
      this.connected = true;

      // notify at the beginning if camera is disabled
      this.videochatService.toggleMedia(this.supportCamera, this.supportMic);

      // listen for interrupts
      // stream.getTracks().map(track => track.onended = () => setTimeout(() => {
      //   if (track.readyState === 'ended') {
      //     this.connected = false;
      //     this.loadingMessage = 'Lost connection. Please hold on...';
      //     this.videochatService.ready();
      //   }
      // }, 2000));

      this.showStream(this.remoteVideo.nativeElement, stream);
    });

    this.rtcPeer.on('close', () => {
      this.loadingMessage = 'Connection was interrupted.';
      this.rtcPeer.destroy();
      this.rtcPeer = null;
    });

    this.rtcPeer.on('error', err => {
      console.log('rtcerr', err);
      if (this.rtcPeer.destroyed) {
        return;
      }

      this.connected = false;
      this.rtcPeer.destroy();
      this.error.emit('An error occurred: ' + err);
    });
  }

  /**
   * Toggles camera
   */
  toggleCamera(): void {
    if (!this.rtcStream) {
      return;
    }

    this.cameraOn = !this.cameraOn;

    for (const track of this.rtcStream.getVideoTracks()) {
      track.enabled = this.cameraOn;
    }

    this.videochatService.toggleMedia(this.micOn, this.cameraOn);
  }

  /**
   * Toggles microphone
   */
  toggleMicrophone(): void {
    if (!this.rtcStream) {
      return;
    }

    this.micOn = !this.micOn;

    for (const track of this.rtcStream.getAudioTracks()) {
      track.enabled = this.micOn;
    }

    this.videochatService.toggleMedia(this.micOn, this.cameraOn);
  }

  /**
   * General function for displaying Media Stream inside
   * an HTML <video> element (cross browser support).
   */
  showStream(elem: HTMLMediaElement, stream): void {
   if (typeof(elem.srcObject) !== 'undefined') {
      elem.srcObject = stream;
    } else {
      // use deprecated method for fallback
      elem.src = window.URL.createObjectURL(stream);
    }
  }

  sendMessage(evt) {
    if (evt) {
      evt.preventDefault();
    }

    this.videochatService.message(this.currentMessage);
    this.currentMessage = '';
  }

  formatTime(dt): String {
    return moment(dt).format('HH:mm');
  }

  /**
   * Shows stream from local webcam in browser
   * and joins Appointment Socket.IO room.
   */
  initialize(stream, video = true): void {
    this.supportCamera = video;
    this.supportMic = true;
    this.rtcStream = stream;
    this.showStream(this.localVideo.nativeElement, stream);
    this.videochatService.join();
  }

  ngOnInit() {
    // initiate connection process by asking for access to
    // camera and microphone first.
    this.getMediaPermission(true)
      .then(
        stream => this.initialize(stream),
        () => this.getMediaPermission(false)
          .then(
            stream => this.initialize(stream, false),
            () => this.error.emit('Could not get media permission.')
          )
      );

    this.videochatService.on('joined')
      .subscribe(() => {
        console.log('onjoined');
        this.videochatService.ready();
      });

    this.videochatService.on('ready')
      .subscribe(data => {
        console.log('onready', data);
        this.rtcInitiator = data.initiator === true;

        console.log(this.rtcPeer);

        if (data.ready === true) {
          this.connect();
        } else {
          this.loadingMessage = 'Waiting for opponent to join';
          this.connected = false;
        }
      });

    this.videochatService.on('ended').subscribe(() => this.exit());

    this.videochatService.on('signal')
      .subscribe(data => {
        console.log('signal', data);
        if (this.rtcPeer && !this.rtcPeer.destroyed) {
          this.rtcPeer.signal(data);
        }
      });

    this.videochatService.on('message').subscribe(message => this.messages.push(message));

    this.videochatService.on('toggleMedia')
      .subscribe(res => {
        console.log(res);
        this.opponentCamera = res.video;
        this.opponentMic = res.audio;
      });
  }

  ngOnDestroy(): void {
    this.exit(false);
  }
}
