import React, { Component } from 'react';
import App from './App';
// Material UI config
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Material UI Colors
import { white, blue600, blue300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue600,
  },
  appBar: {
    color: blue600,
  },
  raisedButton: {
    color: blue600,
    textColor: white,
  },
  textField: {
    focusColor: blue300,
  }
});

class MuiConfig extends Component {
  componentWillMount() {
    // Inside the Lifecycle hook to fix the Hot Reloading Issue
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <App routerPath={this.props.location.pathname} />
      </MuiThemeProvider>
    );
  }
}

export default MuiConfig;
