import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';
import { fetchSearchBooks } from '../actions/search';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard';

class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    // Function Bindings
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  handleSearchChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleKeys(e) {
    if (e.keyCode === 13) {
      e.target.blur();
      this.searchBooks();
    } else if (e.keyCode === 27) {
      this.setState({
        searchTerm: '',
      });
      e.target.blur();
    }
  }

  searchBooks() {
    this.props.dispatch(fetchSearchBooks(this.state.searchTerm));
  }

  render() {
    const { isSearching, error, items } = this.props;
    let bookCards = items.map(book => (
      <BookCard
        key={book.id}
        id={book.id}
        title={book.title}
        subtitle={book.subtitle}
        description={book.description}
        coverPhoto={book.imageLink}
        infoLink={book.infoLink}
      />
    ));
    return (
      <div id="add-books-container">
        <h1>Add Books</h1>
        <div id="search-container">
          <TextField
            id="text-search"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeys}
          />
          <FlatButton label="Search" onClick={this.searchBooks} />
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
  },
) => {
  const srch = state.search;
  return {
    isSearching: srch.isSearching,
    error: srch.error,
    items: srch.items,
  };
};

export default connect(mapStateToProps)(AddBooks);
