import {
  LOGIN_USER,
  LOGIN_FAILED,
  LOGOUT_USER,
  ADD_USER_BOOK,
  REMOVE_USER_BOOK,
  UPDATE_PROFILE,
  REQUEST_TRADE,
  RECEIVE_TRADE_REQUEST,
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
    case UPDATE_PROFILE:
      const { fullName, city, stateLocation } = action.profile;
      return {
        ...state,
        fullName,
        city,
        stateLocation,
      };
    case REQUEST_TRADE:
      return {
        ...state,
        requestedBooks: [
          ...state.requestedBooks,
          {
            bookID: action.bookID,
            owner: action.owner,
            status: 'Pending',
          },
        ],
      };
    case RECEIVE_TRADE_REQUEST:
      return {
        ...state,
        incomingRequests: [
          ...state.incomingRequests,
          {
            bookID: action.bookID,
            owner: action.owner,
            status: 'Pending',
          },
        ],
      };
    default:
      return state;
  }
};

export default user;
