import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import BookCard from './BookCard';

class MyBooks extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBooks());
  }

  render() {
    const { isFetching, userBooks } = this.props;

    let bookItems = userBooks.map(book => (
      <BookCard key={`my-${book.bookID}`} book={book} removeButton />
    ));
    return (
      <div className="books-container">
        {isFetching ? <p>Loading</p> : bookItems}
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

export default connect(mapStateToProps)(MyBooks);
