import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';
import { fetchSearchBooks, clearSearch } from '../actions/search';
import { sendAddBook } from '../actions/user';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard';

class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  handleSearchChange = e => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleSearchClick = () => this.props.searchBooks(this.state.searchTerm);

  handleKeys = e => {
    if (e.keyCode === 13) {
      e.target.blur();
      this.props.searchBooks(this.state.searchTerm);
    } else if (e.keyCode === 27) {
      this.setState({
        searchTerm: '',
      });
      e.target.blur();
    }
  };

  render() {
    const { isSearching, error, items } = this.props;
    let bookCards = items.map(book => (
      <BookCard
        key={book.bookID}
        id={book.bookID}
        addBook={this.props.addBook}
        owned={this.props.userBooks.includes(book.bookID)}
        book={book}
      />
    ));
    return (
      <div id="add-books-container">
        <div id="search-container">
          <TextField
            id="text-search"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeys}
            autoFocus
          />
          <FlatButton label="Search" onClick={this.handleSearchClick} />
        </div>
        <div id="search-books-container">
          {isSearching
            ? <p>Loading</p>
            : error ? <p>Books not found</p> : bookCards}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state = {
    isSearching: false,
    items: [],
    error: false,
    userBooks: [],
  },
) => {
  const srch = state.search;
  return {
    isSearching: srch.isSearching,
    error: srch.error,
    items: srch.items,
    userBooks: state.user.ownedBooks,
  };
};

const mapDispatchToProps = dispatch => ({
  addBook: book => {
    dispatch(sendAddBook(book));
  },
  searchBooks: term => {
    dispatch(fetchSearchBooks(term));
  },
  clearSearch: () => {
    dispatch(clearSearch());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
