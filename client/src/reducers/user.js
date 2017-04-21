import { combineReducers } from 'redux';
import { NEW_USER, LOGIN_USER } from '../actions/user';

const user = (
  state = {
    username: '',
    fullName: '',
    state: '',
    city: '',
    ownedBooks: [],
    tradeRequests: [],
  },
  action,
) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user;
      
    default:
      return state;
  }
};

export default user;
