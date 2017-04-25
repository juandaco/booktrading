import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideDialog } from '../actions/ui';
import { Dialog, FlatButton } from 'material-ui';

class InfoDialog extends Component {
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { dialog, hideDialog } = this.props;
    if (dialog) {
      e.preventDefault();
      if (e.keyCode === 27 || e.keyCode === 13) {
        hideDialog();
      }
    }
  };

  render() {
    const { title, dialogText, dialog, hideDialog } = this.props;
    return (
      <Dialog
        title={title || null}
        actions={<FlatButton label="OK" onClick={hideDialog} />}
        open={dialog}
        autoScrollBodyContent={true}
      >
        {dialogText}
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    dialog: state.ui.dialog,
    dialogText: state.ui.dialogText,
  }),
  dispatch => ({
    hideDialog: () => {
      dispatch(hideDialog());
    },
  }),
)(InfoDialog);
