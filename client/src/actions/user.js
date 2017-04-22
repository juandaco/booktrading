import defaultUserState from '../helpers/defaultUserState';
import { showError } from '../actions/ui';

export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
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

export const signUp = (newUser, history) => dispatch => {
  const request = new Request(`/auth/signup`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(newUser),
    credentials: 'include', // Authenticated
  });
  return fetch(request)
    .then(resp => resp.json())
    .then(user => {
      if (user.message) {
        history.push('/');
        const formattedUser = {
          ...defaultUserState,
          username: newUser.username,
        };
        dispatch(loginUser(formattedUser));
      } else if (user.errorMsg) {
        dispatch(showError(user.errorMsg));
      }
    })
    .catch(err => {
      dispatch(loginFailed());
    });
};
