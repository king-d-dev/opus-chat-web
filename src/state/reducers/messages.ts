import produce from 'immer';
import { ActionType, Message } from '../../types';
import { Action } from '../actions';

interface MessagesState {
  all: Record<string, Message[] | undefined>;
}

const initialState: MessagesState = { all: {} };

export default produce(
  (state: MessagesState = initialState, action: Action): MessagesState => {
    switch (action.type) {
      case ActionType.SET_MESSAGES:
        state.all = action.payload;
        return state;

      case ActionType.ADD_MESSAGE:
        const { message, otherUser } = action.payload;

        const messages = state.all[otherUser];
        if (messages) {
          messages.push(message);
        } else {
          state.all[otherUser] = [message];
        }

        return state;

      default:
        return state;
    }
  }
);
