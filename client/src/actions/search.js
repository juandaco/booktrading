export const SEARCH_BOOK = 'SEARCH_BOOK';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

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
})

/*
  Async Thunk Actions
*/
export const fetchSearchBooks = term => dispatch => {
  dispatch(searchBook(term));
  return fetch(`/api/books/search?term=${term}`)
    .then(response => response.json())
    .then(items => {
      if (items.errorMsg) {
        dispatch(searchError());
      } else {
        dispatch(receiveSearchResults(items));
      }
    });
};
