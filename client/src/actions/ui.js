export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SHOW_INFO_DIALOG = 'SHOW_INFO_DIALOG';
export const HIDE_INFO_DIALOG = 'HIDE_INFO_DIALOG';
export const SHOW_TRADE_DIALOG = 'SHOW_TRADE_DIALOG';
export const HIDE_TRADE_DIALOG = 'HIDE_TRADE_DIALOG';
export const SHOW_REMOVE_DIALOG = 'SHOW_REMOVE_DIALOG ';
export const HIDE_REMOVE_DIALOG = 'HIDE_REMOVE_DIALOG';

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

export const showTradeDialog = (bookID, owners) => ({
  type: SHOW_TRADE_DIALOG,
  bookID,
  owners,
});

export const hideTradeDialog = () => ({
  type: HIDE_TRADE_DIALOG,
});

export const showRemoveDialog = bookID => ({
  type: SHOW_REMOVE_DIALOG,
  bookID,
});

export const hideRemoveDialog = () => ({
  type: HIDE_REMOVE_DIALOG,
});

/*
  Async Actions
*/
export const sendShowTradeDialog = bookID => dispatch => {
  return fetch(`/api/users/details?bookID=${bookID}`, {
    accept: 'application/json',
    credentials: 'include',
  })
    .then(body => body.json())
    .then(resp => {
      if (resp.message === 'User Details') {
        dispatch(showTradeDialog(bookID, resp.owners));
      }
    })
    .catch(err => console.log(err));
};
