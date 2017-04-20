import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import { FlatButton } from 'material-ui';

const BookCard = ({ coverPhoto, title, description }) => {
  return (
    <Card className="book-card">
      <CardMedia>
        <img src={coverPhoto} alt={`${title} Cover`} />
      </CardMedia>
      <CardTitle title={title} />
      <CardText>
        {description}
      </CardText>
      <CardActions>
        <FlatButton label="Add" />
      </CardActions>
    </Card>
  );
};

export default BookCard;
