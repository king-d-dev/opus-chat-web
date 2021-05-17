import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';

const reducers = combineReducers({ users, messages });

export type StoreState = ReturnType<typeof reducers>;
export { reducers };
