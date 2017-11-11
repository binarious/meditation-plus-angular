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

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private service: MessageService,
    private store$: Store<AppState>
  ) {}

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
        map(toPayload),
        switchMap(message => this.service.post(message)),
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
    wsOnMessage = this.actions$
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
