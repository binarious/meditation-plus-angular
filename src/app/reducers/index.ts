import {
  ActionReducerMap
} from '@ngrx/store';
import { MessageState, messageReducer } from 'app/message/reducers/message.reducers';

export interface AppState {
  messages: MessageState;
}

export const appReducers: ActionReducerMap<AppState> = {
  messages: messageReducer
};
