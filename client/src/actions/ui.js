export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SHOW_INFO_DIALOG = 'SHOW_DIALOG';
export const HIDE_INFO_DIALOG = 'HIDE_DIALOG';

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const showInfoDialog = (title, subtitle, text) => ({
  type: SHOW_INFO_DIALOG,
  title,
  subtitle,
  text,
});

export const hideInfoDialog = () => ({
  type: HIDE_INFO_DIALOG,
});