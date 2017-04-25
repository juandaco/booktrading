import React, { Component } from 'react';
import { TextField, FlatButton, CircularProgress } from 'material-ui';
import { fetchSearchBooks, clearSearch } from '../actions/search';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard';
import SearchIcon from 'material-ui/svg-icons/action/search';

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
        key={`add-${book.bookID}`}
        id={book.bookID}
        book={book}
        addButton={!this.props.userBooks.includes(book.bookID)}
      />
    ));
    return (
      <div className="component-container">
        <div className="search-container">
          <TextField
            className="search-text"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeys}
            autoFocus
          />
          <FlatButton
            label="Search"
            icon={<SearchIcon />}
            labelPosition="after"
            onClick={this.handleSearchClick}
          />
        </div>
        <div className="books-container">
          {isSearching
            ? <CircularProgress size={80} thickness={5} />
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
  searchBooks: term => {
    dispatch(fetchSearchBooks(term));
  },
  clearSearch: () => {
    dispatch(clearSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
