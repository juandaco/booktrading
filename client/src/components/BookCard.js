import React from 'react';
import { connect } from 'react-redux';
import { sendAddBook, sendRemoveBook } from '../actions/user';
import { Card, CardActions, CardMedia } from 'material-ui/Card';
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

const BookCard = ({ book, addBook, addButton, removeBook, removeButton }) => {
  const { imageLink, title } = book;
  return (
    <Card className="book-card">
      <CardMedia>
        <img className="book-image" src={imageLink} alt={`${title} Cover`} />
      </CardMedia>
      {addButton
        ? <CardActions style={{ textAlign: 'right' }}>
            <FlatButton
              label="Add"
              style={buttonStyle}
              icon={<AddIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              labelStyle={labelStyle}
              onTouchTap={() => addBook(book)}
            />
          </CardActions>
        : null}
        {removeButton
        ? <CardActions style={{ textAlign: 'right' }}>
            <FlatButton
              label="remove"
              style={buttonStyle}
              icon={<RemoveIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              labelStyle={labelStyle}
              onTouchTap={() => removeBook(book)}
            />
          </CardActions>
        : null}
    </Card>
  );
};

export default connect(null, dispatch => ({
  addBook: book => {
    dispatch(sendAddBook(book));
  },
  removeBook: bookID => {
    dispatch(sendRemoveBook(bookID));
  }
}))(BookCard);
