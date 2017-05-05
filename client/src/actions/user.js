import { showInfoDialog } from '../actions/ui';
import {
  addBook,
  removeBook,
  addUserToBook,
  removeUserFromBook,
} from '../actions/books';

export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const ADD_USER_BOOK = 'ADD_USER_BOOK';
export const REMOVE_USER_BOOK = 'REMOVE_USER_BOOK';
export const REQUEST_TRADE = 'REQUEST_TRADE';
export const ACCEPT_TRADE = 'ACCEPT_TRADE';
export const DECLINE_TRADE = 'DECLINE_TRADE';
export const REMOVE_INCOMING_REQUESTS = 'REMOVE_INCOMING_REQUEST';

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

export const requestTrade = (bookID, owner) => ({
  type: REQUEST_TRADE,
  bookID,
  owner,
});

export const acceptTrade = (bookID, user) => ({
  type: ACCEPT_TRADE,
  bookID,
  user,
});

export const declineTrade = (bookID, user) => ({
  type: DECLINE_TRADE,
  bookID,
  user,
});

export const removeIncomingRequest = bookID => ({
  type: REMOVE_INCOMING_REQUESTS,
  bookID,
});

/*
  Async Complex Actions
*/
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
        dispatch(showInfoDialog('Something Wrong', '', resp.errorMsg));
      }
    })
    .catch(err => {
      dispatch(loginFailed());
    });
};

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
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(sendLogin(newUser, history));
      } else if (resp.errorMsg) {
        dispatch(showInfoDialog('Something Wrong', '', resp.errorMsg));
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
        dispatch(loginUser(resp.user));
      }
    })
    .catch(err => console.log(err));
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

export const sendAddBook = book => (dispatch, getState) => {
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
      const username = getState().user.username;
      if (resp.message) dispatch(addUserBook(book.bookID));
      if (resp.message === 'Book Added') {
        book.owners = [username];
        dispatch(addBook(book));
      } else if (resp.message === 'User Added') {
        dispatch(addUserToBook(book.bookID, username));
      }
    })
    .catch(err => console.log(err));
};

export const sendRemoveBook = book => (dispatch, getState) => {
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
        dispatch(removeIncomingRequest(book.bookID));
      }
      if (resp.message === 'Book Deleted') {
        dispatch(removeBook(book.bookID));
      } else if (resp.message === 'Owner Deleted') {
        const username = getState().user.username;
        dispatch(removeUserFromBook(book.bookID, username));
      }
    })
    .catch(err => console.log(err));
};

export const sendProfileUpdate = profile => dispatch => {
  const request = new Request('/api/users/current', {
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

export const sendTradeRequest = (bookID, owner) => dispatch => {
  const request = new Request('/api/users/trade', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      action: 'ADD',
      bookID,
      owner,
      status: 'Pending',
    }),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(requestTrade(bookID, owner));
      }
    })
    .catch(err => console.log(err));
};

export const sendAcceptTrade = (bookID, user) => dispatch => {
  const request = new Request('/api/users/trade', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      action: 'ACCEPT',
      bookID,
      user,
    }),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(acceptTrade(bookID, user));
      }
    })
    .catch(err => console.log(err));
};


export const sendDeclineTrade = (bookID, user) => dispatch => {
  const request = new Request('/api/users/trade', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      action: 'DECLINE',
      bookID,
      user,
    }),
    credentials: 'include',
  });
  return fetch(request)
    .then(body => body.json())
    .then(resp => {
      if (resp.message) {
        dispatch(declineTrade(bookID, user));
      }
    })
    .catch(err => console.log(err));
};