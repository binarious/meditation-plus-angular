import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MessageService } from 'app/message/message.service';
import { Store, Action } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { UserService } from 'app/user';
import { WS_ON_MESSAGE, WebsocketOnMessage, SyncMessages, WebsocketOnMessagePayload } from 'app/message/actions/message.actions';
import { map, withLatestFrom, filter, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { selectMessageList } from 'app/message/reducers/message.reducers';
import { Message } from 'app/message/message';
import { WebsocketService } from 'app/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WSOnMessageEffect {
  constructor(
    private actions$: Actions,
    private service: MessageService,
    private store$: Store<AppState>,
    private userService: UserService,
    private wsService: WebsocketService
  ) {
  }

  @Effect()
  wsReceiverMessage$ =  this.wsService.onMessage()
    .map(data => new WebsocketOnMessage(data));

  @Effect()
  wsOnMessage$ = this.actions$
    .ofType<WebsocketOnMessage>(WS_ON_MESSAGE)
    .pipe(
      map(action => action.payload),
      withLatestFrom(this.store$.select(selectMessageList)),
      switchMap(([payload, messages]) => mapOnMessageToSync(payload, messages))
    );
}

export function mapOnMessageToSync(payload: WebsocketOnMessagePayload, messages: Message[]): Observable<Action> {
  const last = messages.length > 1 ? messages[messages.length - 2] : null;

  if (!last || moment(last.createdAt).isSame(payload.previous.createdAt)) {
    return Observable.of({ type: 'NO_ACTION' });
  }

  return Observable.of(new SyncMessages({
    index: messages.length - 2,
    from: last.createdAt,
    to: moment(payload.previous.createdAt)
  }));
}
