import { combineReducers } from 'redux';
import {
  TOGGLE_DRAWER,
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG,
  SHOW_TRADE_DIALOG,
  HIDE_TRADE_DIALOG,
  SHOW_REMOVE_DIALOG,
  HIDE_REMOVE_DIALOG,
} from '../actions/ui';

function drawer(state = false, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return !state;
    default:
      return state;
  }
}

function infoDialog(
  state = {
    show: false,
    title: '',
    subtitle: '',
    text: '',
  },
  action,
) {
  switch (action.type) {
    case SHOW_INFO_DIALOG:
      return {
        show: true,
        title: action.title,
        subtitle: action.subtitle,
        text: action.text,
      };
    case HIDE_INFO_DIALOG:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}

const tradeDialog = (
  state = {
    show: false,
    bookID: '',
    owners: [],
  },
  action,
) => {
  switch (action.type) {
    case SHOW_TRADE_DIALOG:
      return {
        show: true,
        bookID: action.bookID,
        owners: action.owners,
      };
    case HIDE_TRADE_DIALOG:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

const removeDialog = (state = {
  show: false,
  bookID: '',
}, action) => {
  switch(action.type) {
    case SHOW_REMOVE_DIALOG:
      return {
        show: true,
        bookID: action.bookID,
      };
    case HIDE_REMOVE_DIALOG:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  } 
};

const ui = combineReducers({
  drawer,
  infoDialog,
  tradeDialog,
  removeDialog,
});

export default ui;
