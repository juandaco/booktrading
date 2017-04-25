import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import BookCard from './BookCard';
import InfoDialog from './InfoDialog';

class MyBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  componentWillUnmount() {
    this.props.hideDialog();
  }

  render() {
    const { isFetching, userBooks } = this.props;

    let bookItems = userBooks.map(book => (
      <BookCard key={`my-${book.bookID}`} book={book} removeButton />
    ));
    return (
      <div className="books-container">
        {isFetching ? <p>Loading</p> : bookItems}
        <InfoDialog /> 
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
  fetchBooks: () => {
    dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
