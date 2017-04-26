import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideDialog } from '../actions/ui';
import { Dialog, FlatButton } from 'material-ui';
import { white, blue600, blue300 } from 'material-ui/styles/colors';

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
    const isComplex = /<\w+\/?>/g.test(dialogText);
    let formattedText;
    if (isComplex) {
      formattedText = (
        <div
          style={{ textAlign: 'justify ' }}
          dangerouslySetInnerHTML={{ __html: dialogText }}
        />
      );
    }
    return (
      <Dialog
        className="info-dialog"
        title={title || null}
        actions={
          <FlatButton
            label="OK"
            backgroundColor={blue600}
            hoverColor={blue300}
            labelStyle={{ color: white }}
            onClick={hideDialog}
          />
        }
        open={dialog}
        onRequestClose={() => this.props.hideDialog()}
        autoScrollBodyContent={true}
        actionsContainerStyle={{ border: 'none' }}
        titleStyle={{ border: 'none' }}
      >
        {isComplex ? formattedText : dialogText}
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
