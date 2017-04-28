import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import { CircularProgress } from 'material-ui';
import BookCard from './BookCard';
import InfoDialog from './InfoDialog';
import TradeDialog from './TradeDialog';
import uuidV4 from 'uuid/v4';

class AllBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { ownedBooks, isFetching, books, } = this.props;
    // const trade = ownedBooks.includes

    let bookItems = books.map(book => (
      <BookCard
        key={uuidV4()}
        book={book}
        tradeButton={!ownedBooks.includes(book.bookID)}
      />
    ));
    return (
      <div className="component-container">
        <div className="books-container">
          {isFetching
            ? <CircularProgress
                style={{ marginTop: 70 }}
                size={60}
                thickness={5}
              />
            : bookItems}
        </div>
        <InfoDialog />
        <TradeDialog />
      </div>
    );
  }
}

const mapStateToProps = (
  state = {
    ownedBooks: [],
    isFetching: true,
    page: 0,
    books: [],
  },
) => ({
  ownedBooks: state.user.ownedBooks,
  isFetching: state.books.isFetching,
  page: state.books.page,
  books: state.books.items,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks() {
    dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
