import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendLogout } from '../actions/user';
import { toggleDrawer } from '../actions/ui';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem } from 'material-ui';
import HomeIcon from 'material-ui/svg-icons/action/home';
import BookIcon from 'material-ui/svg-icons/action/book';
import BooksIcon from 'material-ui/svg-icons/av/library-books';
import AddBookIcon from 'material-ui/svg-icons/av/library-add';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import AccountIcon from 'material-ui/svg-icons/action/account-box';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

const badgeStyle = {
  position: 'absolute',
  left: 36,
  marginTop: 2,
  fontSize: 10,
  lineHeight: 1.7,
  fontWeight: 'bold',
  textAlign: 'center',
  width: 17,
  height: 17,
  backgroundColor: 'rgb(255, 64, 129)',
  color: 'white',
  borderRadius: 100,
};

const aboutStyle = {
  fontFamily: `'Inknut Antiqua', serif`,
  marginBottom: 0,
  position: 'fixed',
  right: 20,
  bottom: 0,
};

class DrawerContainer extends Component {
  handleToggleDrawer = () => {
    const { toggleDrawer } = this.props;
    toggleDrawer();
  };

  handleLogOut = () => {
    const { logOut, toggleDrawer } = this.props;
    logOut();
    toggleDrawer();
  };

  render() {
    const {
      isUserLogged,
      drawer,
      toggleDrawer,
      myBooksCount,
      tradeRequestsCount,
    } = this.props;
    return (
      <Drawer docked={false} open={drawer} onRequestChange={toggleDrawer}>
        <Link to="/">
          <h1 id="drawer-title">The Book Club</h1>
        </Link>
        <List>
          <Link to="/">
            <ListItem
              primaryText="Home"
              onTouchTap={this.handleToggleDrawer}
              leftIcon={<HomeIcon />}
            />
          </Link>
          <Link to="/browse">
            <ListItem
              primaryText="All Books"
              onTouchTap={this.handleToggleDrawer}
              leftIcon={<BooksIcon />}
            />
          </Link>
          {isUserLogged
            ? <div>
                <Link to="/user/books">
                  <div style={badgeStyle}>
                    {myBooksCount}
                  </div>
                  <ListItem
                    primaryText="My Books"
                    onTouchTap={this.handleToggleDrawer}
                    leftIcon={<BookIcon />}
                  />
                </Link>
                <Link to="/user/add-books">
                  <ListItem
                    primaryText="Add Books"
                    onTouchTap={this.handleToggleDrawer}
                    leftIcon={<AddBookIcon />}
                  />
                </Link>
                <Link to="/user/trade">
                  {tradeRequestsCount
                    ? <div style={badgeStyle}>
                        {tradeRequestsCount}
                      </div>
                    : null}
                  <ListItem
                    primaryText="Trade Requests"
                    onTouchTap={this.handleToggleDrawer}
                    leftIcon={<PeopleIcon />}
                  />
                </Link>
                <Link to="/user/profile">
                  <ListItem
                    primaryText="Profile"
                    onTouchTap={this.handleToggleDrawer}
                    leftIcon={<AccountIcon />}
                  />
                </Link>
                <Link to="/">
                  <ListItem
                    primaryText="Logout"
                    onTouchTap={this.handleLogOut}
                    leftIcon={<ExitIcon />}
                  />
                </Link>
              </div>
            : null}
        </List>
        <Link to="/about">
          <p style={aboutStyle} onTouchTap={this.handleToggleDrawer}>
            About
            <span style={{marginLeft: 10, fontSize: '1.5em', fontWeight: 'bold'}} >T </span>{' '}
            <i style={{fontSize: '1.3em', marginRight: 5}} className="fa fa-book" aria-hidden="true" />{'   '}
            <i style={{fontSize: '1.3em'}} className="fa fa-university" aria-hidden="true"></i>
          </p>
        </Link>
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    isUserLogged: Boolean(state.user.username),
    drawer: state.ui.drawer,
    myBooksCount: state.user.ownedBooks.length,
    tradeRequestsCount: state.user.incomingRequests.filter(
      req => req.status === 'Pending',
    ).length,
  }),
  dispatch => ({
    toggleDrawer() {
      dispatch(toggleDrawer());
    },
    logOut() {
      dispatch(sendLogout());
    },
  }),
)(DrawerContainer);
