import React, { Component } from 'react';
// React Router
import { Route } from 'react-router';
// React Redux
import { connect } from 'react-redux';
import { getUserInSession } from '../actions/user';
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
// My Components
import DrawerContainer from './DrawerContainer';
import Home from '../components/Home';
import AllBooks from '../components/AllBooks';
import AddBooks from '../containers/AddBooks';
import About from '../components/About';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

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

  componentDidMount() {
    // Verify User logged from the Server Session
    this.props.getUserInSession(this.props.history);
  }

  openDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  closeDrawer = e => {
    this.setState({
      open: false,
      location: e.target.innerText,
    });
  };

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
                children={<MenuIcon color={white} />}
              />
            }
          />
          <DrawerContainer
            open={this.state.open}
            closeDrawer={this.closeDrawer}
            onRequestChange={this.onRequestChange}
            setLocation={this.setLocation}
          />

          {/* Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/browse" component={AllBooks} />
          <Route exact path="/user/add-books" component={AddBooks} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (
  state = {
    location: 'Home',
  },
) => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  getUserInSession: history => {
    dispatch(getUserInSession(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
