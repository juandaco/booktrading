import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideRemoveDialog } from '../actions/ui';
import { sendRemoveBook } from '../actions/user';
import { Dialog, FlatButton } from 'material-ui';
import { white, blue600, blue300 } from 'material-ui/styles/colors';

class RemoveDialog extends Component {
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { show, hideRemoveDialog } = this.props;
    if (show) {
      e.preventDefault();
      if (e.keyCode === 27) {
        hideRemoveDialog();
      } else if (e.keyCode === 13) {
        this.handleRemoveBook();
      }
    }
  };

  handleRemoveBook = () => {
    const { book, removeBook, hideRemoveDialog, } = this.props;
    removeBook(book);
    hideRemoveDialog();
  }

  render() {
    const { show, hideRemoveDialog, } = this.props;
    return (
      <Dialog
        title="Confirm Deletion"
        className="info-dialog"
        actions={
          <div>
            <FlatButton
              label="Cancel"
              backgroundColor={blue600}
              hoverColor={blue300}
              labelStyle={{ color: white }}
              onClick={hideRemoveDialog}
            />
            <FlatButton
              label="Remove"
              style={{ marginLeft: 5 }}
              backgroundColor={blue600}
              hoverColor={blue300}
              labelStyle={{ color: white }}
              onClick={this.handleRemoveBook}
            />
          </div>
        }
        open={show}
        onRequestClose={() => hideRemoveDialog()}
      >
        All incoming trade requests related to this book will also be removed. 
        This action cannot be undone. Are you sure that you want to continue?
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    show: state.ui.removeDialog.show,
    book: state.books.items.find(
      book => book.bookID === state.ui.removeDialog.bookID,
    ),
  }),
  dispatch => ({
    hideRemoveDialog() {
      dispatch(hideRemoveDialog());
    },
    removeBook(book) {
      dispatch(sendRemoveBook(book));
    },
  }),
)(RemoveDialog);
