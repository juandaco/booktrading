// import { combineReducers } from 'redux';
import {
   LOGIN_USER,
   LOGIN_FAILED,
   LOGOUT_USER,
} from '../actions/user';
import defaultUserState from '../helpers/defaultUserState';

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user;
    case LOGIN_FAILED:
    case LOGOUT_USER:
      return defaultUserState;
    default:
      return state;
  }
};

export default user;
