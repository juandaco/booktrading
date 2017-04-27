import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideInfoDialog } from '../actions/ui';
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
    const { dialog, hideInfoDialog } = this.props;
    if (dialog) {
      e.preventDefault();
      if (e.keyCode === 27 || e.keyCode === 13) {
        hideInfoDialog();
      }
    }
  };

  render() {
    const { title, subtitle, text, show, hideInfoDialog } = this.props;
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
    let formattedTitle;
    if (subtitle) {
      formattedTitle = (
        <div style={{ paddingBottom: 10}}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <h6 style={{ margin: 0, color: 'darkgrey'}}>{subtitle}</h6>
        </div>
      );
    }
    return (
      <Dialog
        className="info-dialog"
        title={formattedTitle || title}
        titleStyle={{ border: 'none', }}
        actions={
          <FlatButton
            label="OK"
            backgroundColor={blue600}
            hoverColor={blue300}
            labelStyle={{ color: white }}
            onClick={hideInfoDialog}
          />
        }
        open={show}
        onRequestClose={() => this.props.hideInfoDialog()}
        autoScrollBodyContent={true}
        actionsContainerStyle={{ border: 'none' }}
      >
        {isComplex ? formattedText : text}
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    show: state.ui.infoDialog.show,
    title: state.ui.infoDialog.title,
    subtitle: state.ui.infoDialog.subtitle,
    text: state.ui.infoDialog.text,
  }),
  dispatch => ({
    hideInfoDialog: () => {
      dispatch(hideInfoDialog());
    },
  }),
)(InfoDialog);
