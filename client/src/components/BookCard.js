import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import { FlatButton } from 'material-ui';
// import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AddIcon from 'material-ui/svg-icons/content/add-circle';

const buttonStyle = {
  minWidth: 70,
};

const BookCard = ({ coverPhoto, title, subtitle, description, infoLink }) => {
  return (
    <Card className="book-card">
      <CardMedia>
        <img className="book-image" src={coverPhoto} alt={`${title} Cover`} />
      </CardMedia>
      <CardTitle title={title} subtitle={subtitle} />
      <CardText className="book-description">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </CardText>
      <CardActions style={{ textAlign: 'right' }}>
        <FlatButton label="More" style={buttonStyle} href={infoLink} target="_blank" />
        <FlatButton
          label="Add"
          style={buttonStyle}
          icon={<AddIcon style={{ width: 19 }} />}
          labelPosition="before"
        />
      </CardActions>
    </Card>
  );
};

export default BookCard;
