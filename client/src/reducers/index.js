import { combineReducers } from 'redux';
import books from './books';
import search from './search';

const mainReducer = combineReducers({
  books,
  search,
});

export default mainReducer;
