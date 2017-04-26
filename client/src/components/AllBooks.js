import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/books';
import { showDialog } from '../actions/ui';
import { CircularProgress } from 'material-ui';
import BookCard from './BookCard';
import InfoDialog from './InfoDialog';

class AllBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { isFetching, books, showDialog } = this.props;

    let bookItems = books.map(book => (
      <BookCard
        key={`all-${book.bookID}`}
        book={book}
        showDialog={showDialog}
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

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => {
    dispatch(fetchBooks());
  },
  showDialog: () => {
    dispatch(showDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
