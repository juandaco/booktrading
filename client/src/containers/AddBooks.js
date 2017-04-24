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
        title={book.title}
        subtitle={book.author}
        description={book.description}
        coverPhoto={book.imageLink}
        infoLink={book.infoLink}
        addBook={this.props.addBook}
        bookID={book.bookID}
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
  },
) => {
  const srch = state.search;
  return {
    isSearching: srch.isSearching,
    error: srch.error,
    items: srch.items,
  };
};

const mapDispatchToProps = dispatch => ({
  addBook: bookID => {
    console.log('BookID', bookID);
  },
  searchBooks: term => {
    dispatch(fetchSearchBooks(term));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
