export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

export const requestBooks = page => ({
  type: REQUEST_BOOKS,
  page,
});

export const receiveBooks = items => ({
  type: RECEIVE_BOOKS,
  items,
});

export const fetchBooks = dispatch => page => {
  dispatch(requestBooks(page));
  return fetch(`/api/books/${page}`)
    .then(response => response.json())
    .then(json => dispatch(receiveBooks(json)));
};
