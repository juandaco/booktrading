export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
// export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
// export const ADD_BOOK_CONFIRMATION = 'ADD_BOOK_CONFIRMATION';
// export const REMOVE_BOOK = 'REMOVE_BOOK';

/*
  Simple Action Creators
*/
export const requestBooks = page => ({
  type: REQUEST_BOOKS,
  page,
});

export const receiveBooks = items => ({
  type: RECEIVE_BOOKS,
  items,
});

// export const addBookRequest = (bookID, user) => ({
//   type: ADD_BOOK_REQUEST,
//   bookID,
//   user,
// });

/*
  Helpers
*/
const shouldFetchBooks = state => {
  return !state.books.items.length;
};

/*
  Async Thunk Action Creators
*/
export const fetchBooks = page => (dispatch, getState) => {
  if (shouldFetchBooks(getState())) {
    dispatch(requestBooks(page));
    return fetch(`/api/books/${page}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveBooks(json.items));
      });
  }
};
