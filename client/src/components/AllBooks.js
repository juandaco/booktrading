import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import BookCard from './BookCard';

class AllBooks extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBooks(0));
  }

  render() {
    const { isFetching, items } = this.props;

    let bookItems = items.map(book => (
      <BookCard key={book.bookID} book={book}/>
    ));
    return (
      <div>
        <h1>AllBooks</h1>
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
    items: [],
  },
) => ({
  isFetching: state.books.isFetching,
  page: state.books.page,
  items: state.books.items,
});

export default connect(mapStateToProps)(AllBooks);
