import React from 'react';
import { connect } from 'react-redux';
import { sendAddBook, sendRemoveBook } from '../actions/user';
import { showDialog } from '../actions/ui';
// Material UI
import { Paper } from 'material-ui';
import { FlatButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
// import RemoveIcon from 'material-ui/svg-icons/navigation/close';
// import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { blue600 } from 'material-ui/styles/colors';

const buttonStyle = {
  minWidth: 70,
};

const labelStyle = {
  color: blue600,
};

const BookCard = ({
  book,
  addBook,
  addButton,
  removeBook,
  removeButton,
  showDialog,
}) => {
  const {
    imageLink,
    title,
    subtitle,
    author,
    pageCount,
    isbn,
    publishedDate,
    description,
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
        {/*<div
          style={{ textAlign: 'justify ' }}
          dangerouslySetInnerHTML={{ __html: description }}
        />*/}
      </div>
      <div className="buttons-card-container">
        <FlatButton
          label="More Info"
          style={buttonStyle}
          labelPosition="before"
          labelStyle={labelStyle}
          onTouchTap={() => showDialog(description)}
        />
        {addButton
          ? <FlatButton
              label="Add"
              style={buttonStyle}
              icon={<AddIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              labelStyle={labelStyle}
              onTouchTap={() => addBook(book)}
            />
          : null}
        {removeButton
          ? <FlatButton
              label="remove"
              style={buttonStyle}
              icon={<RemoveIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              labelStyle={labelStyle}
              onTouchTap={() => removeBook(book)}
            />
          : null}
      </div>

    </Paper>
  );
};

export default connect(null, dispatch => ({
  addBook: book => {
    dispatch(sendAddBook(book));
  },
  removeBook: bookID => {
    dispatch(sendRemoveBook(bookID));
  },
  showDialog: message => {
    dispatch(showDialog(message));
  },
}))(BookCard);
