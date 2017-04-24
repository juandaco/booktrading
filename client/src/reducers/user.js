import {
   LOGIN_USER,
   LOGIN_FAILED,
   LOGOUT_USER,
   ADD_BOOK,
} from '../actions/user';
import defaultUserState from '../helpers/defaultUserState';

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, action.user);
    case LOGIN_FAILED:
    case LOGOUT_USER:
      return defaultUserState;
    case ADD_BOOK:
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.bookID],
      };
    default:
      return state;
  }
};

export default user;
