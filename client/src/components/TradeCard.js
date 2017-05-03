import React from 'react';
import { connect } from 'react-redux';
import { Paper, FlatButton } from 'material-ui';

const TradeCard = ({ book, accept, decline }) => {
  const { title, subtitle, imageLink, status, userOwner, userReq } = book;
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
          <strong>Status:</strong> {status}
        </p>
        {userReq && status === 'Pending'
          ? <div className="buttons-card-container">
              <FlatButton label="Decline" secondary />
              <FlatButton label="Accept" secondary />
            </div>
          : null}
      </div>
    </Paper>
  );
};

export default connect()(TradeCard);
