import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MessageService } from 'app/message/message.service';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { SyncMessages, SYNC, SyncMessagesDone } from '../actions/message.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SyncMessageEffect {
  constructor(
    private actions$: Actions,
    private service: MessageService,
  ) {
  }

  @Effect()
  sync$ = this.actions$
    .ofType<SyncMessages>(SYNC)
    .pipe(
      map(action => action.payload),
      switchMap(payload =>
        this.service.synchronize(payload.from, payload.to.toDate()).pipe(
          map(res => res.json()),
          switchMap(messages => Observable.of(new SyncMessagesDone({ index: payload.index, messages })))
        )
      )
    );
}
