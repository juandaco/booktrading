import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { fetchIP } from '../actions';
// React Router
import { Route } from 'react-router';
// Material UI config
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Material UI Components
import { AppBar, IconButton } from 'material-ui';
// Material UI Colors
import { blue600 } from 'material-ui/styles/colors';
// Material UI Icons
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
// My Components
import DrawerContainer from './DrawerContainer';
import Home from '../components/Home';
import AllBooks from '../components/AllBooks';
import About from '../components/About';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: true,
      open: false,
      location: 'Home',
    };
  }

  componentWillMount() {
    // Inside the Lifecycle hook to fix the Hot Reloading Issue
    injectTapEventPlugin();
  }

  openDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  closeDrawer = () => this.setState({ open: false });

  onRequestChange = open => this.setState({ open });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div id="app-container">

          <AppBar
            title={this.state.location === 'Home' ? '' : this.state.location}
            style={{
              backgroundColor: blue600,
              height: this.state.location === 'Home' ? 0 : 60,
            }}
            iconElementLeft={
              <IconButton
                onTouchTap={this.openDrawer}
                children={<MenuIcon color={'#fff'} />}
              />
            }
          />

          {/*<header>
            <IconButton
              style={{
                color: 'white',
                position: 'absolute',
                left: 12,
                top: 8,
                zIndex: 2,
              }}
              className="main-menu-button"
              onTouchTap={this.openDrawer}
              children={<MenuIcon color={'#fff'} />}
            />
          </header>*/}

          <DrawerContainer
            open={this.state.open}
            closeDrawer={this.closeDrawer}
            onRequestChange={this.onRequestChange}
            isUserLogged={this.state.isUserLogged}
          />

          {/* Routes to */}

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/browse" component={AllBooks} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    ip: state.ip,
    isFetching: state.isFetching,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchIP: () => {
    dispatch(fetchIP());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
