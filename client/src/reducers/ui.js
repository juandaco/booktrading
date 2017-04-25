import {
  TOGGLE_DRAWER,
  SHOW_DIALOG,
  HIDE_DIALOG,
  } from '../actions/ui';

function ui(
  state = {
    openDrawer: false,
    dialog: false,
    dialogText: '',
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    case SHOW_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogText: action.message,
      };
    case HIDE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogText: '',
      };
    default:
      return state;
  }
}

export default ui;
