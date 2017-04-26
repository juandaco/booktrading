import {
  REQUEST_BOOKS,
  RECEIVE_BOOKS,
  ADD_BOOK,
  REMOVE_BOOK,
  ADD_USER_TO_BOOK,
  REMOVE_USER_FROM_BOOK,
} from '../actions/books';

const books = (
  state = {
    isFetching: false,
    didInvalidate: false,
    page: 0,
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_BOOKS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
      };
    case ADD_BOOK:
      return {
        ...state,
        items: [...state.items, action.book],
      };
    case REMOVE_BOOK:
      return {
        ...state,
        items: state.items.filter(item => item.bookID !== action.bookID),
      };
    case ADD_USER_TO_BOOK:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.bookID === action.bookID) {
            item.owners.push(action.username);
          }
          return item;
        }),
      };
    case REMOVE_USER_FROM_BOOK:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.bookID === action.bookID) {
            const newItem = Object.assign({}, item);
            newItem.owners = item.owners.filter(owner => owner !== action.username);
            return newItem;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default books;
