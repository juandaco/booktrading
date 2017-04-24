import defaultUserState from '../helpers/defaultUserState';
import { showError } from '../actions/ui';

export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const ADD_BOOK = 'ADD_BOOK_REQUEST';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const loginFailed = () => ({
  type: LOGIN_FAILED,
});

export const logOutUser = () => ({
  type: LOGOUT_USER,
});

export const addBook = bookID => ({
  type: ADD_BOOK,
  bookID,
});

/*
  Async Complex Actions
*/
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

export const getUserInSession = history => dispatch => {
  return fetch('/auth/user-session', {
    accept: 'application/json',
    credentials: 'include',
  })
    .then(body => body.json())
    .then(resp => {
      if (resp.user) {
        // history.push('/');
        dispatch(loginUser(resp.user));
      }
    })
    .catch(err => console.log(err));
};

export const sendLogin = (user, history) => dispatch => {
  const request = new Request(`/auth/login`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(user),
    credentials: 'include', // Authenticated
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.user) {
        history.push('/');
        dispatch(loginUser(resp.user));
      } else if (resp.errorMsg) {
        dispatch(showError(resp.errorMsg));
      }
    })
    .catch(err => {
      dispatch(loginFailed());
    });
};

export const sendLogout = () => dispatch => {
  return fetch('/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
    .then(body => body.json())
    .then(resp => {
      if (resp.message || resp.errorMsg) {
        dispatch(logOutUser());
      }
    })
    .catch(err => console.log(err));
};

export const sendAddBook = book => dispatch => {
  const request = new Request('/api/books', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ book }),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(addBook(book.bookID));
      }
    })
    .catch(err => console.log(err));
};
