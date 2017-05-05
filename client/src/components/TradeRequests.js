import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendAcceptTrade, sendDeclineTrade } from '../actions/user';
import TradeCard from './TradeCard';
import uuidV4 from 'uuid/v4';

class TradeRequests extends Component {
  render() {
    const { reqBooks, incBooks, acceptTrade, declineTrade } = this.props;
    const reqBookCards = reqBooks.map(book => {
      return <TradeCard key={`req=${uuidV4()}`} book={book} />;
    });
    const incBookCards = incBooks.map(book => {
      return (
        <TradeCard
          key={`inc-${uuidV4()}`}
          book={book}
          accept={acceptTrade}
          decline={declineTrade}
        />
      );
    });
    return (
      <div id="trades-container">
        <div id="requests-container" className="component-container">
          <h1>My Requests</h1>
          {reqBookCards}
        </div>
        <div id="incoming-container" className="component-container">
          <h1>Incoming</h1>
          {incBookCards}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    reqBooks: state.user.requestedBooks.map(trade => {
      const book = state.books.items.find(book => trade.bookID === book.bookID);
      let newBook = Object.assign({}, book);
      newBook.userOwner = trade.owner;
      newBook.status = trade.status;
      return newBook;
    }),
    incBooks: state.user.incomingRequests.map(trade => {
      const book = state.books.items.find(book => trade.bookID === book.bookID);
      let newBook = Object.assign({}, book);
      newBook.userReq = trade.user;
      newBook.status = trade.status;
      return newBook;
    }),
  }),
  dispatch => ({
    acceptTrade(bookID, user) {
      dispatch(sendAcceptTrade(bookID, user));
    },
    declineTrade(bookID, user) {
      dispatch(sendDeclineTrade(bookID, user));
    },
  }),
)(TradeRequests);
