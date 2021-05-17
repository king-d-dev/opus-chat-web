import { Dispatch } from 'redux';
import { ActionType, Message, User } from '../../types';
import {
  Action,
  AddMessageAction,
  SetCurrentChatAction,
  SetMessagesAction,
  SetUserAction,
  SetUsersAction,
} from '../actions';
import { StoreState } from '../reducers';

export const setUser = (payload: User): SetUserAction => {
  return { type: ActionType.SET_USER, payload };
};

export const setUsers = (payload: { [key: string]: User }): SetUsersAction => {
  return { type: ActionType.SET_USERS, payload };
};

export const removeUser = (payload: User['email']) => (
  dispatch: Dispatch<Action>,
  getState: () => StoreState
) => {
  dispatch({ type: ActionType.REMOVE_USER, payload });

  const { currentChat } = getState().users;
  if (currentChat === payload) dispatch(setCurrentChat(null));
};

export const setCurrentChat = (
  payload: User['email'] | null
): SetCurrentChatAction => {
  return { type: ActionType.SET_CURRENT_CHAT, payload };
};

export const setMessages = (payload: {
  [key: string]: Message[];
}): SetMessagesAction => {
  return { type: ActionType.SET_MESSAGES, payload };
};

export const addMessage = (payload: {
  message: Message;
  otherUser: User['email'];
}): AddMessageAction => {
  return { type: ActionType.ADD_MESSAGE, payload };
};
