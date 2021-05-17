import produce from 'immer';
import { ActionType, User } from '../../types';
import { Action } from '../actions';

interface UsersState {
  all: { [key: string]: User };
  currentChat: User['email'] | null;
}

const initialState: UsersState = {
  all: {},
  currentChat: null,
};

export default produce(
  (state: UsersState = initialState, action: Action): UsersState => {
    switch (action.type) {
      case ActionType.SET_USER:
        state.all[action.payload.email] = action.payload;
        return state;

      case ActionType.SET_USERS:
        state.all = action.payload;
        return state;

      case ActionType.REMOVE_USER:
        delete state.all[action.payload];
        return state;

      case ActionType.SET_CURRENT_CHAT:
        state.currentChat = action.payload;
        return state;

      default:
        return state;
    }
  }
);
