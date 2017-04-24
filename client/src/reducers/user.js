import {
   LOGIN_USER,
   LOGIN_FAILED,
   LOGOUT_USER,
   ADD_USER_BOOK,
   REMOVE_USER_BOOK,
} from '../actions/user';
import defaultUserState from '../helpers/defaultUserState';

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, action.user);
    case LOGIN_FAILED:
    case LOGOUT_USER:
      return defaultUserState;
    case ADD_USER_BOOK:
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.bookID],
      };
    case REMOVE_USER_BOOK:
      return {
        ...state,
        ownedBooks: state.ownedBooks.filter(book => book !== action.bookID),
      };
    default:
      return state;
  }
};

export default user;
