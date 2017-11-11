import { Message } from "app/message/message";
import * as message from '../actions/message.actions';
import * as moment from 'moment';

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
  switch(action.type) {
    case message.LOAD: {
      return {
        ...state,
        loading: true
      }
    }
    case message.LOAD_DONE: {
      const messages = state.loadedPage === 0
        ? action.payload
        : [...action.payload, ...state.messages];

      const usernames = new Set();
      messages.forEach(msg => {
        const name = msg.user && msg.user.username ? msg.user.username : null;
        name && usernames.add(name);
      });

      return {
        ...state,
        messages,
        loadedPage: action.page,
        noPagesLeft: action.page > 0 && action.payload.length === 0,
        usernames: Array.from(usernames).sort(),
        loading: false
      }
    }

    case message.POST: {
      return {...state, posting: true}
    }

    case message.POST_DONE: {
      return {...state, posting: false}
    }

    case message.SYNC_DONE: {
      return {
        ...state,
        messages: state.messages.splice(
          action.payload.index,
          0,
          ...action.payload.messages
        ).sort(sortMessages)
      }
    }

    case message.WS_ON_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
          .sort(sortMessages)
      }
    }

    default: {
      return state;
    }
  }
}

function sortMessages(a: any, b: any) {
  return moment(a.createdAt).unix() - moment(b.createdAt).unix();
}
