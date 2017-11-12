import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MessageService } from 'app/message/message.service';
import * as message from '../actions/message.actions';
import * as moment from 'moment';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { toPayload } from '@ngrx/effects/src/util';
import { Message } from 'app/message/message';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { filter } from 'rxjs/operators/filter';
import { UserService } from 'app/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/if';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private service: MessageService,
    private store$: Store<AppState>,
    private userService: UserService
  ) {
  }

  @Effect()
  load$ = this.actions$
    .ofType(message.LOAD)
    .pipe(
      map(toPayload),
      switchMap(page =>
        this.service.getRecent(page).pipe(
          map(data => data.json()),
          tap(this.setLastMessage),
          map(data => ({ type: message.LOAD_DONE, payload: data, page }))
        )
      )
    );

    @Effect()
    post$ = this.actions$
      .ofType(message.POST)
      .pipe(
        withLatestFrom(this.store$.select('messages').select('currentMessage')),
        switchMap(([payload, curMessage]) => this.service.post(curMessage)),
        map(data => data.json()),
        map(payload => ({ type: message.POST_DONE, payload }))
      );

    @Effect()
    sync$ = this.actions$
      .ofType(message.SYNC)
      .pipe(
        map(toPayload),
        switchMap(payload =>
          this.service.synchronize(payload.from, payload.to.toDate()).pipe(
            map(res => res.json()),
            map(res => ({ index: payload.index, messages: res })),
            map(res => ({ type: message.SYNC_DONE, res }))
          )
        )
      );

    @Effect()
    wsOnMessage$ = this.actions$
      .ofType(message.WS_ON_MESSAGE)
      .pipe(
        map(toPayload),
        withLatestFrom(this.store$.select('messages').select('messages')),
        map(([payload, messages]) =>
          [payload, messages, messages.length > 1 ? messages[messages.length - 2] : null]
        ),
        filter(([payload, messages, last]) =>
          last && !moment(last.createdAt).isSame(payload.previous.createdAt)
        ),
        map(([payload, messages, last]) => ({
          index: messages.length - 2,
          from: last.createdAt,
          to: moment(payload.previous.createdAt)
        })),
        map(payload => ({ type: message.SYNC, payload }))
      );

    @Effect()
    wsOnConnect$ = this.actions$
      .ofType(message.WS_ON_CONNECT)
      .pipe(
        map(toPayload),
        withLatestFrom(this.store$.select('messages').select('messages')),
        map(([payload, messages]) =>
          [payload, messages, messages[messages.length - 1]]
        ),
        filter(([payload, messages, last]) =>
          last && !moment(last.createdAt).isSame(payload.latestMessage.createdAt)
        ),
        map(([payload, messages, last]) => ({
          index: messages.length - 1,
          from: last.createdAt,
          to: moment(payload.latestMessage.createdAt)
        })),
        map(payload => ({ type: message.SYNC, payload }))
      );

    @Effect()
    $autocomplete = this.actions$
      .ofType(message.AUTOCOMPLETE_USER)
      .pipe(
        map(toPayload),
        withLatestFrom(
          this.store$.select('messages').select('usernames'),
          this.store$.select('messages').select('currentMessage')
        ),
        filter(([carentPos, usernames, curMsg]) => usernames.length > 0),
        map(([caretPos, usernames, curMsg]) => {
          const textBfCaret = curMsg.substring(0, caretPos);
          const search = textBfCaret.match(/@\w+$/g);
          return [caretPos, usernames, curMsg, textBfCaret, search];
        }),
        filter(([caretPos, usernames, curMsg, textBfCaret, search]) => search && search.length > 0),
        switchMap(([caretPos, usernames, curMsg, textBfCaret, search]) => {
          const matches = usernames
          .filter(name => new RegExp('^' + search[0].substring(1), 'i').test(name));
          return Observable.if(
            () => matches.length > 0,
            Observable.of(this.createAutocompletePayload(
              caretPos, curMsg, textBfCaret,
              search, matches[0]
            )),
            this.userService.getUsername(search[0].substring(1))
              .map(res => res.json())
              .filter(res => res.length > 0)
              .map(username => this.createAutocompletePayload(
                caretPos, curMsg, textBfCaret,
                search, username
              ))
            );
        })
      );

    private createAutocompletePayload(
      caretPos: number,
      curMsg: string,
      textBfCaret: string,
      search: any[],
      username: string
    ) {
      textBfCaret = textBfCaret.slice(0, 1 - search[0].length) + username + ' ';
      const payload = textBfCaret + curMsg.substring(caretPos);
      return ({ type: message.SET_CUR_MESSAGE, payload });
    }

    private setLastMessage(messages: Message[]) {
      if (messages.length === 0) {
        return;
      }
      window.localStorage.setItem(
        'lastMessage',
        messages[messages.length - 1].createdAt.toString()
      );
    }
}
