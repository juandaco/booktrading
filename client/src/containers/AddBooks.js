import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchBooks, clearSearch } from '../actions/search';
import { TextField, FlatButton, CircularProgress } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import BookCard from '../components/BookCard';
import InfoDialog from '../components/InfoDialog';
import { white, blue600, blue300 } from 'material-ui/styles/colors';
import uuidV4 from 'uuid/v4';

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
    const { searchBooks } = this.props;
    if (this.state.searchTerm) searchBooks(this.state.searchTerm);
  };

  handleKeys = e => {
    if (e.keyCode === 13 && this.state.searchTerm) {
      e.target.blur();
      const { searchBooks } = this.props;
      searchBooks(this.state.searchTerm);
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
        key={uuidV4()}
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
            : error
                ? <p style={{ fontSize: '1.3em', color: 'grey'}}>
                    No Books found !!!
                    <br />
                    <br />
                    <i className="fa fa-frown-o fa-2x" aria-hidden="true" />
                  </p>
                : bookCards}
        </div>
        <InfoDialog />
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
  searchBooks(term) {
    dispatch(fetchSearchBooks(term));
  },
  clearSearch() {
    dispatch(clearSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
