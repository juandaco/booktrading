import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import { CircularProgress } from 'material-ui';
import BookCard from './BookCard';
import InfoDialog from './InfoDialog';
import RemoveDialog from './RemoveDialog';
import uuidV4 from 'uuid/v4';

class MyBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { isFetching, userBooks } = this.props;

    let bookItems = userBooks.map(book => (
      <BookCard key={uuidV4()} book={book} removeButton />
    ));
    return (
      <div className="books-container">
        {isFetching
          ? <CircularProgress
              style={{ marginTop: 70 }}
              size={60}
              thickness={5}
            />
          : <bookItems className="length"></bookItems> ?
            bookItems: <p>You don't have books yet</p>
          }
        <InfoDialog />
        <RemoveDialog />
      </div>
    );
  }
}

const mapStateToProps = (
  state = {
    isFetching: false,
    userBooks: [],
  },
) => ({
  isFetching: state.books.isFetching,
  userBooks: state.books.items.filter(book =>
    state.user.ownedBooks.includes(book.bookID),
  ),
});

const mapDispatchToProps = dispatch => ({
  fetchBooks() {
    dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
