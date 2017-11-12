import {
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { Message, MessageWebsocketResponse } from './message';
import * as moment from 'moment';
import { WebsocketService } from '../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import * as message from 'app/message/actions/message.actions';
import { MessageState } from 'app/message/reducers/message.reducers';
import { throttleTime, mapTo, startWith, debounceTime, merge, take } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';
import { clearTimeout, setTimeout } from 'timers';
import { NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: [
    './message.component.styl'
  ]
})
export class MessageComponent implements OnInit, OnDestroy {

  @Output() loadingFinished: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('messageList', {read: ElementRef}) messageList: ElementRef;

  messages$: Observable<Message[]>;
  usernames$: Observable<string[]>;
  loading$: Observable<boolean>;
  page$: Observable<number>;
  noPagesLeft$: Observable<boolean>;
  posting$: Observable<boolean>;

  messageSocket;
  updateSocket;
  lastScrollTop = 0;
  lastScrollHeight = 0;
  showEmojiSelect = false;
  menuOpen = false;

  store: Store<MessageState>;
  form: FormGroup;
  message: FormControl;

  constructor(
    public messageService: MessageService,
    public userService: UserService,
    public appRef: ApplicationRef,
    public wsService: WebsocketService,
    public appStore: Store<AppState>,
    private zone: NgZone
  ) {
    this.form = new FormGroup({
      message: new FormControl()
    });
    this.message = this.form.get('message') as FormControl;

    this.store = appStore.select('messages');
    this.messages$ = this.store.select('messages');
    this.usernames$ = this.store.select('usernames');
    this.loading$ = this.store.select('loading');
    this.page$ = this.store.select('loadedPage');
    this.noPagesLeft$ = this.store.select('noPagesLeft');
    this.posting$ = this.store.select('posting');

    appStore.dispatch(new message.LoadMessages(0));
    this.store.select('currentMessage').subscribe(
      val => this.form.get('message').setValue(val, { emitEvent: false })
    );
    this.message.valueChanges.subscribe(
      val => appStore.dispatch(new message.SetCurrentMessage(val))
    );
  }

  ngOnInit() {
    this.registerScrolling();

    this.messages$
      .filter(() => this.lastScrollTop + 5 >= this.lastScrollHeight
        - this.messageList.nativeElement.offsetHeight)
      .subscribe(() => this.scrollToBottom());

    // subscribe to the websocket
    this.messageSocket = this.wsService.onMessage()
      .subscribe(data => this.store.dispatch(new message.WebsocketOnMessage(data)));

    // synchronize messages on reconnection
    this.wsService.onConnected()
      .subscribe(data => this.store.dispatch(new message.WebsocketOnConnect()));

    // subscribe to message updates
    this.updateSocket = this.messageService.getUpdateSocket()
    .subscribe(data => this.store.dispatch(new message.UpdateMessage(data.populated)));

    this.loadingFinished.emit();
  }

  loadNextPage() {
    this.page$.pipe(
      take(1)
    )
    .subscribe(page => this.store.dispatch(new message.LoadMessages(page + 1)));
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  emojiSelect(evt) {
    this.message.setValue(`${this.message.value}:${evt}:`)
    this.showEmojiSelect = false;
  }

  sendMessage(evt: KeyboardEvent) {
    evt.preventDefault();
    this.store.dispatch(new message.PostMessage());
  }

  autocomplete(evt: KeyboardEvent) {
    evt.preventDefault();
    this.store.dispatch(new message.AutocompleteUser(
      (evt.target as HTMLTextAreaElement).selectionEnd
        ? (evt.target as HTMLTextAreaElement).selectionEnd
        : this.message.value.length
    ));
  }

  /**
   * Registers scrolling as observable. Running this outside of zone to ignore
   * a change detection run on every scroll event. This resulted in a huge performance boost.
   */
  registerScrolling() {
    this.zone.runOutsideAngular(() => {
      let scrollTimer = null;
      this.messageList.nativeElement.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
          clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
          this.lastScrollHeight = this.messageList.nativeElement.scrollHeight;
          this.lastScrollTop = this.messageList.nativeElement.scrollTop;
        }, 150);
      }, false);
    });
  }

  scrollToBottom() {
    window.setTimeout(() => {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    }, 10);
  }

  trackById(index, item: Message) {
    return item._id;
  }

  ngOnDestroy() {
    this.messageSocket.unsubscribe();
    this.updateSocket.unsubscribe();
  }
}
