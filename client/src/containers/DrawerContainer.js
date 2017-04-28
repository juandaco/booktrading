import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendLogout } from '../actions/user';
import { toggleDrawer } from '../actions/ui';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem } from 'material-ui';

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
    const { isUserLogged, drawer, toggleDrawer } = this.props;
    return (
      <Drawer docked={false} open={drawer} onRequestChange={toggleDrawer}>
        <List>
          <Link to="/">
            <ListItem primaryText="Home" onTouchTap={this.handleToggleDrawer} />
          </Link>
          <Link to="/browse">
            <ListItem
              primaryText="All Books"
              onTouchTap={this.handleToggleDrawer}
            />
          </Link>
          {isUserLogged
            ? <div>
                <Link to="/user/books">
                  <ListItem
                    primaryText="My Books"
                    onTouchTap={this.handleToggleDrawer}
                  />
                </Link>
                <Link to="/user/add-books">
                  <ListItem
                    primaryText="Add Books"
                    onTouchTap={this.handleToggleDrawer}
                  />
                </Link>
                <Link to="/user/trade">
                  <ListItem
                    primaryText="Trade Requests"
                    onTouchTap={this.handleToggleDrawer}
                  />
                </Link>
                <Link to="/user/profile">
                  <ListItem
                    primaryText="Profile"
                    onTouchTap={this.handleToggleDrawer}
                  />
                </Link>
                <Link to="/">
                  <ListItem
                    primaryText="Logout"
                    onTouchTap={this.handleLogOut}
                  />
                </Link>
              </div>
            : null}
          <Link to="/about">
            <ListItem
              primaryText="About"
              onTouchTap={this.handleToggleDrawer}
            />
          </Link>
        </List>
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    isUserLogged: Boolean(state.user.username),
    drawer: state.ui.drawer,
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
