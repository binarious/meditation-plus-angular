import { UserTextListModule } from './../user-text-list/user-text-list.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { MessageComponent } from './message.component';
import { MessageListEntryComponent } from './list-entry/message-list-entry.component';
import { EmojiModule } from '../emoji';
import { ProfileModule } from '../profile';
import { MomentModule } from 'angular2-moment';
import { MentionsPipe } from './mentions.pipe';
import { EffectsModule } from '@ngrx/effects';
import { AutocompleteMessageEffect } from 'app/message/effects/autocomplete-message.effect';
import { LoadMessageEffect } from 'app/message/effects/load-messages.effect';
import { SyncMessageEffect } from 'app/message/effects/sync-message.effect';
import { WsOnConnectMessageEffect } from 'app/message/effects/ws-on-connect-message.effect';
import { WSOnMessageEffect } from 'app/message/effects/ws-on-message.effect';
import { PostMessageEffect } from 'app/message/effects/post-message.effect';

@NgModule({
  imports: [
    SharedModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    EmojiModule,
    MomentModule,
    UserTextListModule,
    EffectsModule.forFeature([
      AutocompleteMessageEffect,
      LoadMessageEffect,
      PostMessageEffect,
      SyncMessageEffect,
      WsOnConnectMessageEffect,
      WSOnMessageEffect
    ]),
  ],
  declarations: [
    MessageComponent,
    MessageListEntryComponent,
    MentionsPipe
  ],
  exports: [
    MessageComponent,
    MessageListEntryComponent,
    MentionsPipe
  ]
})
export class MessageModule { }
