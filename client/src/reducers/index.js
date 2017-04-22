import { combineReducers } from 'redux';
import books from './books';
import search from './search';
import user from './user';

const mainReducer = combineReducers({
  books,
  search,
  user,
});

export default mainReducer;
