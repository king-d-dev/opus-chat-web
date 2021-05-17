import { ActionType, Message, User } from '../../types';

export interface SetUserAction {
  type: ActionType.SET_USER;
  payload: User;
}

export interface SetUsersAction {
  type: ActionType.SET_USERS;
  payload: { [key: string]: User };
}

export interface RemoveUserAction {
  type: ActionType.REMOVE_USER;
  payload: User['email'];
}

export interface SetCurrentChatAction {
  type: ActionType.SET_CURRENT_CHAT;
  payload: User['email'] | null;
}

export interface SetMessagesAction {
  type: ActionType.SET_MESSAGES;
  payload: { [key: string]: Message[] };
}

export interface AddMessageAction {
  type: ActionType.ADD_MESSAGE;
  payload: { message: Message; otherUser: User['email'] };
}

export type Action =
  | SetCurrentChatAction
  | SetUserAction
  | SetUsersAction
  | RemoveUserAction
  | SetMessagesAction
  | AddMessageAction;
