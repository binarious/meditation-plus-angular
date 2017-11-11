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
  @ViewChild('message', {read: ElementRef}) messageElem: ElementRef;

  messages$: Observable<Message[]>;
  usernames$: Observable<string[]>;
  loading$: Observable<boolean>;
  page$: Observable<number>;
  noPagesLeft$: Observable<boolean>;
  posting$: Observable<boolean>;

  messageSocket;
  updateSocket;
  currentMessage = '';
  lastScrollTop = 0;
  lastScrollHeight = 0;
  showEmojiSelect = false;
  loadedInitially = false;
  noMorePages = false;
  menuOpen = false;

  store: Store<MessageState>;

  constructor(
    public messageService: MessageService,
    public userService: UserService,
    public appRef: ApplicationRef,
    public wsService: WebsocketService,
    public appStore: Store<AppState>,
    private zone: NgZone
  ) {
    this.store = appStore.select('messages');
    this.messages$ = this.store.select('messages');
    this.usernames$ = this.store.select('usernames');
    this.loading$ = this.store.select('loading');
    this.page$ = this.store.select('loadedPage');
    this.noPagesLeft$ = this.store.select('noPagesLeft');
    this.posting$ = this.store.select('posting');

    appStore.dispatch(new message.LoadMessages(0));
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

  /**
   * Find the first matching username for given search string
   * @param  {string} str search
   * @return {string}     username
   *
  autocomplete(caretPosition: number): void {
    if (!this.usernames) {
      return;
    }

    let textBeforeCaret = this.currentMessage.substring(0, caretPosition);
    const search = textBeforeCaret.match(/@\w+$/g);

    if (search) {
      const matches = this.usernames
        .filter(name => new RegExp('^' + search[0].substring(1), 'i').test(name));

      if (matches.length > 0) {
        textBeforeCaret = textBeforeCaret.slice(0, 1 - search[0].length) + matches[0] + ' ';
        this.currentMessage = textBeforeCaret + this.currentMessage.substring(caretPosition);
      } else {
        this.userService.getUsername(search[0])
          .map(res => res.json())
          .subscribe(username => {
            if (username.length > 0) {
              textBeforeCaret = textBeforeCaret.slice(0, 1 - search[0].length) + matches[0] + ' ';
              this.currentMessage = textBeforeCaret + this.currentMessage.substring(caretPosition);
            }
          });
      }

    }
  }*/

  emojiSelect(evt) {
    this.currentMessage += ':' + evt + ':';
    this.showEmojiSelect = false;
  }

  sendMessage() {
    this.store.dispatch(new message.PostMessage(this.currentMessage));
  }

  /**
   * Intercept the keypress of 'Enter' and submit message.
   * @param {[type]} evt             JavaScript event
   * @param {[type]} messageAutoSize Autosize property for passing it into 'sendMessage'
   */
  enterMessage(evt) {
    const charCode = evt.which || evt.keyCode;

    if (charCode === 13) {
      // ENTER
      this.sendMessage();
    } else if (charCode === 9)  {
      // TAB
      evt.preventDefault();
     // this.autocomplete(evt.target.selectionEnd ? evt.target.selectionEnd : this.currentMessage.length);
    }
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

  /*updateMessage(message: Message) {
    this.messages = this.messages
      .map(val => {
        if (val._id === message._id) {
          return message;
        }

        return val;
      });
  }*/

  ngOnInit() {
    this.registerScrolling();

    this.messages$
      .filter(() => this.lastScrollTop + 5 >= this.lastScrollHeight
        - this.messageList.nativeElement.offsetHeight)
      .subscribe(() => this.scrollToBottom());

    // subscribe to the websocket
    this.messageSocket = this.wsService.onMessage()
      .subscribe(data => this.store.dispatch(new message.WebsocketOnMessage(data)));
    /*
    // synchronize messages on reconnection
    this.wsService.onConnected()
      .subscribe(data => {
        if (!this.messages || this.messages.length === 0) {
          return;
        }

        const lastMessage = this.messages[this.messages.length - 1];
        // check if messages are missing
        if (!moment(lastMessage.createdAt).isSame(data.latestMessage.createdAt)) {
          this.synchronize(
            this.messages.length - 1,
            lastMessage,
            moment(data.latestMessage.createdAt)
          );
        }
      });

    // subscribe to message updates
    this.updateSocket = this.messageService.getUpdateSocket()
      .map(res => res.populated)
      .subscribe(data => this.updateMessage(data));*/
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
