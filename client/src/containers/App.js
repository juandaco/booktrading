import React, { Component } from 'react';
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
import AddBooks from '../containers/AddBooks';
import About from '../components/About';
import SignUp from '../components/SignUp';

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
                children={<MenuIcon color={'#fff'} />}
              />
            }
          />
          <DrawerContainer
            open={this.state.open}
            closeDrawer={this.closeDrawer}
            onRequestChange={this.onRequestChange}
            isUserLogged={this.state.isUserLogged}
            setLocation={this.setLocation}
          />

          {/* Routes to */}

          <Route exact path="/" component={Home} />
          <Route exact path="/browse" component={AllBooks} />
          <Route exact path="/user/add-books" component={AddBooks} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
