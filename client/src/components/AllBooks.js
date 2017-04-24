import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import BookCard from './BookCard';

class AllBooks extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBooks());
  }

  render() {
    const { isFetching, books } = this.props;

    let bookItems = books.map(book => (
      <BookCard key={book.bookID} book={book}/>
    ));
    return (
      <div className="books-container">
        {isFetching
          ? <p>Loading</p>
          : <ul>
              {bookItems}
            </ul>}
      </div>
    );
  }
}

const mapStateToProps = (
  state = {
    isFetching: true,
    page: 0,
    books: [],
  },
) => ({
  isFetching: state.books.isFetching,
  page: state.books.page,
  books: state.books.items,
});

export default connect(mapStateToProps)(AllBooks);
