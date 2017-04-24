import {
  REQUEST_BOOKS,
  RECEIVE_BOOKS,
  ADD_BOOK,
  REMOVE_BOOK,
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
    default:
      return state;
  }
};

export default books;
