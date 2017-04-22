import {
  SET_LOCATION,
  TOGGLE_DRAWER,
  SHOW_ERROR,
  HIDE_ERROR,
} from '../actions/ui';

function ui(
  state = {
    location: 'Home',
    openDrawer: false,
    errorDialog: false,
    errorMsg: '',
  },
  action,
) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    case SHOW_ERROR:
      return {
        ...state,
        errorDialog: true,
        errorMsg: action.message,
      };
    case HIDE_ERROR:
      return {
        ...state,
        errorDialog: false,
        errorMsg: '',
      };
    default:
      return state;
  }
}

export default ui;
