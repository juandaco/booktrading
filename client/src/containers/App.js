import React, { Component } from 'react';
// React Router
import { Route } from 'react-router';
// React Redux
import { connect } from 'react-redux';
// Redux Actions
import { getUserInSession } from '../actions/user';
import { toggleDrawer } from '../actions/ui';
// Material UI config
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Material UI Components
import { AppBar, IconButton } from 'material-ui';
// Material UI Colors
import { white, blue600 } from 'material-ui/styles/colors';
// Material UI Icons
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
// Components
import DrawerContainer from './DrawerContainer';
import routes from '../helpers/routes';

class App extends Component {
  componentWillMount() {
    // Inside the Lifecycle hook to fix the Hot Reloading Issue
    injectTapEventPlugin();
  }

  componentDidMount() {
    // Verify User logged from the Server Session
    this.props.getUserInSession(this.props.history);
  }

  render() {
    const { toggleDrawer } = this.props;
    const isHome = this.props.location.pathname === '/';
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
              backgroundColor: blue600,
              height: isHome ? 0 : 60,
            }}
            iconElementLeft={
              <IconButton
                onTouchTap={toggleDrawer}
                children={<MenuIcon color={white} />}
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
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (
  state = {
    openDrawer: false,
  },
) => ({
  openDrawer: state.ui.openDrawer,
});

const mapDispatchToProps = dispatch => ({
  getUserInSession: history => {
    dispatch(getUserInSession(history));
  },
  toggleDrawer: () => {
    dispatch(toggleDrawer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
