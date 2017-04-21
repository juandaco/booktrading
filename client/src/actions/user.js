export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_CONFIRMATION = 'ADD_BOOK_CONFIRMATION';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const loginFailed = () => ({
  type: LOGIN_FAILED,
});

export const addBookRequest = bookID => ({
  type: ADD_BOOK_REQUEST,
  bookID,
});

export const addBookConfirmation = () => ({
  type: ADD_BOOK_CONFIRMATION,
});

export const newUser = newUser => dispatch => {
  const request = new Request(`/api/items/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(newUser),
    credentials: 'include', // Authenticated
  });
  return fetch(request)
    .then(user => dispatch(loginUser(user)))
    .catch(() => dispatch(loginFailed()));
};
