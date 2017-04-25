export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const showDialog = message => ({
  type: SHOW_DIALOG,
  message,
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});