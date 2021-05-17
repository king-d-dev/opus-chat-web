export enum ActionType {
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  REMOVE_USER = 'REMOVE_USER',
  SET_CURRENT_CHAT = 'SET_CURRENT_CHAT',
  SET_MESSAGES = 'SET_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE',
}

export interface User {
  email: string;
}

export interface Message {
  id: string;
  text: string;
  from: string;
  to: string;
}

export enum SocketEvent {
  USERS = 'users',
  USER_CONNECTED = 'user connected',
  USER_DISCONNECTED = 'user disconnected',
  MESSAGE = 'message',
  MESSAGES = 'messages',
}
