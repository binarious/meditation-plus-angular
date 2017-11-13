import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MessageService } from 'app/message/message.service';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { PostMessage, POST, PostMessageDone } from '../actions/message.actions';
import { selectCurrentMessage } from 'app/message/reducers/message.reducers';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PostMessageEffect {
  constructor(
    private actions$: Actions,
    private service: MessageService,
    private store$: Store<AppState>
  ) {
  }

  @Effect()
  post$ = this.actions$
    .ofType<PostMessage>(POST)
    .pipe(
      withLatestFrom(this.store$.select(selectCurrentMessage)),
      switchMap(([payload, curMessage]) => this.service.post(curMessage)),
      switchMap(payload => of(new PostMessageDone()))
    );
}
