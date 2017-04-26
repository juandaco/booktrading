export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const showDialog = (title, subtitle, text) => ({
  type: SHOW_DIALOG,
  title,
  subtitle,
  text,
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});