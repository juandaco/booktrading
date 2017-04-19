import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIP } from '../actions';
// Material UI
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
// My Components
import RouterDemo from '../components/RouterDemo';

class App extends Component {
  componentWillMount() {
    // Inside the Lifecycle hook to fix the Hot Reloading Issue
    injectTapEventPlugin();
  }

  componentDidMount() {
    this.props.fetchIP();
  }

  render() {
    const { ip, isFetching } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <h2>Welcome to my MERN Boilerplate</h2>
          </div>
          <p>
            This is a simple working component{' '}
          </p>
          {isFetching
            ? <p style={{ color: 'red' }}>Loading</p>
            : <p style={{ color: 'blue' }}>Your IP address is: {ip}</p>}
          <RouterDemo />
          <p style={{ textAlign: 'center' }}>
            For Syncing React Router with Redux Checkout <br />
            <a
              href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux"
              target="_blank"
            >
              react-router-redux
            </a>
          </p>
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
