import React from 'react';
import { Paper, FlatButton } from 'material-ui';

const TradeCard = ({ book, accept, decline }) => {
  const {
    bookID,
    title,
    subtitle,
    imageLink,
    status,
    userOwner,
    userReq,
  } = book;
  let statusStyle;
  switch (status) {
    case 'Accepted':
      statusStyle = {
        color: '#31c731',
      };
      break;
    case 'Rejected':
      statusStyle = {
        color: 'red',
      };
      break;
    default:
      statusStyle = {
        color: 'black',
      };
  }
  return (
    <Paper className="book-card" zDepth={2}>
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
            marginBottom: 30,
          }}
        >
          {subtitle}
        </h5>
        {userOwner
          ? <p>
              <strong>Owner:</strong> {userOwner}
            </p>
          : null}
        {userReq
          ? <p>
              <strong>User:</strong> {userReq}
            </p>
          : null}
        <p>
          <strong>Status:</strong> <span style={statusStyle}>{status} </span>
        </p>
        {userReq && status === 'Pending'
          ? <div className="buttons-card-container">
              <FlatButton
                label="Decline"
                secondary
                onTouchTap={() => decline(bookID, userReq)}
              />
              <FlatButton
                label="Accept"
                secondary
                onTouchTap={() => accept(bookID, userReq)}
              />
            </div>
          : null}
      </div>
    </Paper>
  );
};

export default TradeCard;
