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
    const { title, subtitle, text, show, hideDialog } = this.props;
    const isComplex = /<\w+\/?>/g.test(text);
    let formattedText;
    if (isComplex) {
      formattedText = (
        <div
          style={{ textAlign: 'justify ' }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
    return (
      <Dialog
        className="info-dialog"
        title={title}
        actions={
          <FlatButton
            label="OK"
            backgroundColor={blue600}
            hoverColor={blue300}
            labelStyle={{ color: white }}
            onClick={hideDialog}
          />
        }
        open={show}
        onRequestClose={() => this.props.hideDialog()}
        autoScrollBodyContent={true}
        actionsContainerStyle={{ border: 'none' }}
        titleStyle={{ border: 'none' }}
      >
        {isComplex ? formattedText : text}
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    show: state.ui.dialog.show,
    title: state.ui.dialog.title,
    subtitle: state.ui.dialog.subtitle,
    text: state.ui.dialog.text,
  }),
  dispatch => ({
    hideDialog: () => {
      dispatch(hideDialog());
    },
  }),
)(InfoDialog);
