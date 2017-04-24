export const SEARCH_BOOK = 'SEARCH_BOOK';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CLEAR_SEARCH = 'CLEAR_SEARCH ';

/*
  Normal Sync Actions
*/
export const searchBook = () => ({
  type: SEARCH_BOOK,
});

export const receiveSearchResults = items => ({
  type: RECEIVE_SEARCH_RESULTS,
  items,
});

export const searchError = () => ({
  type: SEARCH_ERROR,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

/*
  Async Thunk Actions
*/
export const fetchSearchBooks = term => (dispatch, getState) => {
  dispatch(searchBook(term));
  return fetch(`/api/books/search?term=${term}`)
    .then(response => response.json())
    .then(items => {
      if (items.errorMsg) {
        dispatch(searchError());
      } else {
        const { isSearching } = getState().search;
        if (isSearching) dispatch(receiveSearchResults(items));
      }
    });
};
