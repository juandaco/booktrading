import defaultUserState from '../helpers/defaultUserState';
import { showDialog } from '../actions/ui';
import { addBook, removeBook } from '../actions/books';

export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const ADD_USER_BOOK = 'ADD_USER_BOOK';
export const REMOVE_USER_BOOK = 'REMOVE_USER_BOOK';

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

export const addUserBook = bookID => ({
  type: ADD_USER_BOOK,
  bookID,
});

export const removeUserBook = bookID => ({
  type: REMOVE_USER_BOOK,
  bookID,
});

export const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  profile,
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
        dispatch(showDialog(user.errorMsg));
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
    credentials: 'include', 
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.user) {
        history.push('/');
        dispatch(loginUser(resp.user));
      } else if (resp.errorMsg) {
        dispatch(showDialog(resp.errorMsg));
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
        dispatch(addBook(book));
        dispatch(addUserBook(book.bookID));
      }
    })
    .catch(err => console.log(err));
};

export const sendRemoveBook = book => dispatch => {
  const request = new Request('/api/books', {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ bookID: book.bookID }),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(removeUserBook(book.bookID));
        const isLastUser = book.owners.length <= 1;
        if (isLastUser) dispatch(removeBook(book.bookID));
      }
    })
    .catch(err => console.log(err));
};

export const sendProfileUpdate = profile => dispatch => {
  const request = new Request('/api/user/', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(profile),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(updateProfile(profile));
      }
    })
    .catch(err => console.log(err));  
};
