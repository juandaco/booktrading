import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
// Redux Actions
import { getUserInSession } from '../actions/user';
import { toggleDrawer } from '../actions/ui';
// Material UI Components
import { AppBar, IconButton } from 'material-ui';
// Material UI Icons
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
// Components
import DrawerContainer from './DrawerContainer';
import routes from '../helpers/routes';

class App extends Component {
  componentDidMount() {
    // Verify User logged from the Server Session
    this.props.getUserInSession(this.props.history);
  }

  render() {
    const { toggleDrawer, routerPath } = this.props;
    const isHome = routerPath === '/';
    return (
      <div id="app-container">
        <AppBar
          title={routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.title}
            />
          ))}
          style={{
            height: isHome ? 0 : 60,
          }}
          iconElementLeft={
            <IconButton
              onTouchTap={toggleDrawer}
              children={<MenuIcon color={'#fff'} />}
            />
          }
        />

        <DrawerContainer />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInSession(history) {
    dispatch(getUserInSession(history));
  },
  toggleDrawer() {
    dispatch(toggleDrawer());
  },
});

export default connect(null, mapDispatchToProps)(App);
