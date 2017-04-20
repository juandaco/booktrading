export const SEARCH_BOOK = 'SEARCH_BOOK';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

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

/*
  Async Thunk Actions
*/
export const fetchSearchBooks = term => dispatch => {
  dispatch(searchBook(term));
  return fetch(`/api/books/search?term=${term}`)
    .then(response => response.json())
    .then(items => {
      dispatch(receiveSearchResults(items));
    });
};
