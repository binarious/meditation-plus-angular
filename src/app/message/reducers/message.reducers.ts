import { Message } from 'app/message/message';
import * as message from '../actions/message.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AppState } from 'app/reducers';
import { createSelector } from '@ngrx/store';

export interface MessageState {
  messages: Message[];
  currentMessage: string;
  noPagesLeft: boolean;
  loadedPage: number;
  usernames: string[];
  loading: boolean;
  posting: boolean;
}

export const initialMessageState: MessageState = {
  messages: [],
  currentMessage: '',
  noPagesLeft: false,
  loadedPage: 0,
  usernames: [],
  loading: false,
  posting: false
};

export function messageReducer(
  state = initialMessageState,
  action: message.Actions
): MessageState {
  switch (action.type) {
    case message.LOAD: {
      return {
        ..._.cloneDeep(state),
        loading: true
      };
    }
    case message.LOAD_DONE: {
      const messages = state.loadedPage === 0
        ? action.payload.messages
        : [...action.payload.messages, ..._.cloneDeep(state.messages)];

      const usernames = new Set();
      messages.forEach(msg => {
        const name = msg.user && msg.user.username ? msg.user.username : null;
        return name && usernames.add(name);
      });

      return {
        ..._.cloneDeep(state),
        messages,
        loadedPage: action.payload.page,
        noPagesLeft: action.payload.page > 0 && action.payload.messages.length === 0,
        usernames: Array.from(usernames).sort(),
        loading: false
      };
    }

    case message.POST: {
      return {..._.cloneDeep(state), posting: true};
    }

    case message.POST_DONE: {
      return {..._.cloneDeep(state), posting: false, currentMessage: ''};
    }

    case message.SYNC_DONE: {
      return {
        ..._.cloneDeep(state),
        messages: state.messages.splice(
          action.payload.index,
          0,
          ...action.payload.messages
        ).sort(sortMessages)
      };
    }

    case message.WS_ON_MESSAGE: {
      return {
        ..._.cloneDeep(state),
        messages: [...state.messages, action.payload.current]
          .sort(sortMessages)
      };
    }

    case message.SET_CUR_MESSAGE: {
      return {
        ..._.cloneDeep(state),
        currentMessage: action.payload
      };
    }

    case message.UPDATE: {
      return {
        ..._.cloneDeep(state),
        messages: state.messages.map(val => {
          if (val._id === action.payload._id) {
            return action.payload;
          }

          return val;
        })
      };
    }

    default: {
      return state;
    }
  }
}

function sortMessages(a: any, b: any) {
  return moment(a.createdAt).unix() - moment(b.createdAt).unix();
}

export const selectMessages = (state: AppState) => state.messages;
export const selectMessageList = createSelector(selectMessages, (state: MessageState) => state.messages);
export const selectCurrentMessage = createSelector(selectMessages, (state: MessageState) => state.currentMessage);
export const selectNoPagesLeft = createSelector(selectMessages, (state: MessageState) => state.noPagesLeft);
export const selectLoadedPage = createSelector(selectMessages, (state: MessageState) => state.loadedPage);
export const selectUsernames = createSelector(selectMessages, (state: MessageState) => state.usernames);
export const selectLoading = createSelector(selectMessages, (state: MessageState) => state.loading);
export const selectPosting = createSelector(selectMessages, (state: MessageState) => state.posting);
