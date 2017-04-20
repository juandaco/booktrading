import React from 'react';
import { Drawer, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';

const DrawerContainer = ({ open, closeDrawer, onRequestChange, isUserLogged }) => {
  return (
    <Drawer
      docked={false}
      open={open}
      // width={200}
      onRequestChange={onRequestChange}
    >
      <Link to="/">
        <MenuItem onTouchTap={closeDrawer}>Home</MenuItem>
      </Link>
      <Link to="/browse">
        <MenuItem focusState="focused" onTouchTap={closeDrawer}>All Books</MenuItem>
      </Link>
      {isUserLogged
        ? <div>
            <Link to="/user/books">
              <MenuItem onTouchTap={closeDrawer}>My Books</MenuItem>
            </Link>
            <Link to="/user/add-books">
              <MenuItem onTouchTap={closeDrawer}>Add Books</MenuItem>
            </Link>
            <Link to="/user/trade">
              <MenuItem onTouchTap={closeDrawer}>Trade Requests</MenuItem>
            </Link>
            <Link to="/user/pofile">
              <MenuItem onTouchTap={closeDrawer}>Profile</MenuItem>
            </Link>
          </div>
        : null}
      <Link to="/about">
        <MenuItem onTouchTap={closeDrawer}>About</MenuItem>
      </Link>
    </Drawer>
  );
};

export default DrawerContainer;
