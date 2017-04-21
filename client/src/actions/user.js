export const NEW_USER = 'NEW_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_CONFIRMATION = 'ADD_BOOK_CONFIRMATION';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const addBookRequest = bookID => ({
  type: ADD_BOOK_REQUEST,
  bookID,
});

export const addBookConfirmation = () => ({
  type: ADD_BOOK_CONFIRMATION,
});

export const newUser = () =>  {
  type: NEW_USER,
  
};