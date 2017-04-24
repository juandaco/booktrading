import React from 'react';
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import { FlatButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import { blue600 } from 'material-ui/styles/colors';

const buttonStyle = {
  minWidth: 70,
};

const labelStyle = {
  color: blue600,
};

const BookCard = ({ addBook, book, owned }) => {
  const {imageLink, title, infoLink, } = book;
  return (
    <Card className="book-card">
      <CardMedia>
        <img className="book-image" src={imageLink} alt={`${title} Cover`} />
      </CardMedia>
      <CardActions style={{ textAlign: 'right' }}>
        <FlatButton
          label="More"
          style={buttonStyle}
          href={infoLink}
          target="_blank"
          labelStyle={labelStyle}
        />
        {owned
          ? null
          : <FlatButton
              label="Add"
              style={buttonStyle}
              icon={<AddIcon style={{ width: 19 }} color={blue600} />}
              labelPosition="before"
              labelStyle={labelStyle}
              onTouchTap={() => addBook(book)}
            />}
      </CardActions>
    </Card>
  );
};

export default BookCard;
