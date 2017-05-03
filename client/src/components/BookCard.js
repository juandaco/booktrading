import React from 'react';
import { connect } from 'react-redux';
import { sendAddBook, sendRemoveBook } from '../actions/user';
import { showInfoDialog, sendShowTradeDialog } from '../actions/ui';
// Material UI
import { Paper } from 'material-ui';
import { FlatButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import InfoIcon from 'material-ui/svg-icons/action/info';
import TradeIcon from 'material-ui/svg-icons/social/group-add';
import { blue600 } from 'material-ui/styles/colors';

const buttonStyle = {
  minWidth: 70,
  marginLeft: 5,
};

const BookCard = ({
  isUserLogged,
  isRequested,
  book,
  addBook,
  addButton,
  removeBook,
  removeButton,
  showInfoDialog,
  tradeButton,
  sendShowTradeDialog,
}) => {
  const {
    bookID,
    title,
    subtitle,
    author,
    pageCount,
    isbn,
    publishedDate,
    description,
    imageLink,
  } = book;
  let year = '';
  if (typeof publishedDate === 'string') year = publishedDate.substring(0, 4);
  return (
    <Paper className="book-card">
      <img className="book-image" src={imageLink} alt={`${title} Cover`} />
      <div className="book-info">
        <h3
          style={{
            marginTop: 5,
          }}
        >
          {title}
        </h3>
        <h5
          style={{
            marginTop: -10,
            color: 'darkgrey',
            fontStyle: 'italic',
          }}
        >
          {subtitle}
        </h5>
        <p
          style={{
            lineHeight: 1.7,
          }}
        >
          <strong>Author:</strong> {author} <br />
          <strong>Pages:</strong> {pageCount} <br />
          <strong>Year: </strong> {year} <br />
          <strong>ISBN:</strong> {isbn} <br />
        </p>

      </div>
      <div className="buttons-card-container">
        <FlatButton
          label="Info"
          secondary
          style={buttonStyle}
          icon={<InfoIcon style={{ width: 19 }} color={blue600} />}
          labelPosition="before"
          onTouchTap={() => showInfoDialog(title, subtitle, description)}
        />
        {addButton
          ? <FlatButton
              label="Add"
              secondary
              style={buttonStyle}
              icon={<AddIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              onTouchTap={() => addBook(book)}
            />
          : null}
        {removeButton
          ? <FlatButton
              label="Remove"
              secondary
              style={buttonStyle}
              icon={<RemoveIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              onTouchTap={() => removeBook(book)}
            />
          : null}
        {tradeButton && isUserLogged
          ? <FlatButton
              label={isRequested ? 'Requested' : 'Trade'}
              secondary
              disabled={isRequested}
              style={buttonStyle}
              icon={
                isRequested
                  ? null
                  : <TradeIcon style={{ width: 19 }} color={blue600} />
              }
              labelPosition="before"
              onTouchTap={() => sendShowTradeDialog(bookID)}
            />
          : null}
      </div>

    </Paper>
  );
};

export default connect(
  (
    state = {
      isUserLogged: false,
    },
    ownProps,
  ) => ({
    isUserLogged: Boolean(state.user.username),
    isRequested: state.user.requestedBooks.findIndex(
      trade => trade.bookID === ownProps.book.bookID,
    ) > -1,
  }),
  dispatch => ({
    addBook(book) {
      dispatch(sendAddBook(book));
    },
    removeBook(bookID) {
      dispatch(sendRemoveBook(bookID));
    },
    showInfoDialog(title, subtitle, text) {
      dispatch(showInfoDialog(title, subtitle, text));
    },
    sendShowTradeDialog(bookID) {
      dispatch(sendShowTradeDialog(bookID));
    },
  }),
)(BookCard);
