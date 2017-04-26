import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchBooks, clearSearch } from '../actions/search';
import { TextField, FlatButton, CircularProgress } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import BookCard from '../components/BookCard';
import InfoDialog from '../components/InfoDialog';
import { white, blue600, blue300 } from 'material-ui/styles/colors';

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

  handleSearchClick = () => {
    if (this.state.searchTerm) this.props.searchBooks(this.state.searchTerm);
  };

  handleKeys = e => {
    if (e.keyCode === 13 && this.state.searchTerm) {
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
    const { username, isSearching, error, items } = this.props;
    let bookCards = items.map(book => (
      <BookCard
        key={`add-${username}-${book.bookID}`}
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
            name="search-text"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeys}
            autoFocus
          />
          <FlatButton
            label="Search"
            icon={<SearchIcon color={white} />}
            labelPosition="after"
            backgroundColor={blue600}
            hoverColor={blue300}
            labelStyle={{ color: white }}
            onClick={this.handleSearchClick}
          />
        </div>
        <div className="books-container">
          {isSearching
            ? <CircularProgress
                style={{ marginTop: 70 }}
                size={60}
                thickness={5}
              />
            : error ? <p>Books not found</p> : bookCards}
        </div>
        <InfoDialog />
      </div>
    );
  }
}

const mapStateToProps = (
  state = {
    username: '',
    isSearching: false,
    items: [],
    error: false,
    userBooks: [],
  },
) => {
  const srch = state.search;
  return {
    username: state.user.username,
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
