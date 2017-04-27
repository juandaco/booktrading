import { combineReducers } from 'redux';
import { TOGGLE_DRAWER, SHOW_INFO_DIALOG, HIDE_INFO_DIALOG } from '../actions/ui';

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

function drawer(state = false, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return !state;
    default:
      return state;
  }
}

const ui = combineReducers({
  infoDialog,
  drawer,
});

export default ui;
