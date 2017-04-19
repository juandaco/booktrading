import { REQUEST_BOOKS, RECEIVE_BOOKS } from '../actions/books';

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
        page: action.page,
      };
    case RECEIVE_BOOKS: 
      return {
        ...state,
        isFetching: false,
        items: action.items,
      }
    default:
      return state;
  }
};

export default books;
