import {
  SEARCH_BOOK,
  RECEIVE_SEARCH_RESULTS,
  SEARCH_ERROR,
  CLEAR_SEARCH,
} from '../actions/search';

const search = (
  state = {
    isSearching: false,
    error: false,
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case SEARCH_BOOK:
      return {
        ...state,
        isSearching: true,
        error: false,
      };
    case RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        isSearching: false,
        error: false,
        items: action.items,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
        error: true,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        isSearching: false,
        items: [],
      }
    default:
      return state;
  }
};

export default search;
