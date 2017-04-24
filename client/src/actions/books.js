export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
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

export const addBook = book => ({
  type: ADD_BOOK,
  book,
});

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
      .then(body => body.json())
      .then(books => {
        dispatch(receiveBooks(books));
      });
  }
};
