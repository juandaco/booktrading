import { SEARCH_BOOK, RECEIVE_SEARCH_RESULTS } from '../actions/search';

const search = (
  state = {
    isSearching: false,
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case SEARCH_BOOK:
      return {
        ...state,
        isSearching: true,
      };
    case RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        isSearching: false,
        items: action.items,
      };
    default:
      return state;
  }
};

export default search;
