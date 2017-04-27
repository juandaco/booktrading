import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import { showDialog } from '../actions/ui';
import { CircularProgress } from 'material-ui';
import BookCard from './BookCard';
import InfoDialog from './InfoDialog';
import TradeDialog from './TradeDialog';

class AllBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { username, ownedBooks, isFetching, books, showDialog } = this.props;
    // const trade = ownedBooks.includes

    let bookItems = books.map(book => (
      <BookCard
        key={`all-${username}-${book.bookID}`}
        book={book}
        showDialog={showDialog}
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
    username: '',
    ownedBooks: [],
    isFetching: true,
    page: 0,
    books: [],
  },
) => ({
  username: state.user.username,
  ownedBooks: state.user.ownedBooks,
  isFetching: state.books.isFetching,
  page: state.books.page,
  books: state.books.items,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => {
    dispatch(fetchBooks());
  },
  showDialog: () => {
    dispatch(showDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
