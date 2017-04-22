import { combineReducers } from 'redux';
import books from './books';
import search from './search';
import user from './user';
import ui from './ui';

const mainReducer = combineReducers({
  books,
  search,
  user,
  ui,
});

export default mainReducer;
