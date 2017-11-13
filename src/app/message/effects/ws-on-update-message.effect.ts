import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MessageService } from 'app/message/message.service';
import { UpdateMessage } from 'app/message/actions/message.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WsOnUpdateMessageEffect {
  constructor(
    private service: MessageService
  ) {
  }

  @Effect()
  wsOnConnect$ = this.service.getUpdateSocket()
    .switchMap(data => Observable.of(new UpdateMessage(data.populated)));
}
