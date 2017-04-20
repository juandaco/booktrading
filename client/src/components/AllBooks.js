import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';

class AllBooks extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBooks(0));
  }

  render() {
    const { isFetching, page, items } = this.props;

    let bookItems;
    if (Array.isArray(items) && items.length)
      bookItems = items.map(book => {
        return <li key={book}>{book}</li>
        // return <li key={book.id}>{book.title}</li>;
      });

    return (
      <div>
        <h1>AllBooks</h1>
        <p>{page}</p>
        {isFetching
          ? <p>Loading</p>
          : <ul>
              {bookItems}
            </ul>}
      </div>
    );
  }
}

const mapStateToProps = (state = {
  isFetching: true,
  page: 0,
  items: []
}) => ({
  isFetching: state.books.isFetching,
  page: state.books.page,
  items: state.books.items,
});

export default connect(mapStateToProps)(AllBooks);
