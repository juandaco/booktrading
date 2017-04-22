import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/user';
import { hideError } from '../actions/ui';
import { isPasswordValid, isUsernameValid } from '../helpers/inputValidation';
import { TextField, FlatButton, Dialog } from 'material-ui';
import { blue600, blue400 } from 'material-ui/styles/colors';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUsername: false,
      errorPassword: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isInputValid()) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
      this.props.signUp(user, this.props.history);
    }
  };

  isInputValid = () => {
    let status = true;
    if (!isUsernameValid(this.state.username)) {
      this.setState({ errorUsername: true });
      status = false;
    } else {
      this.setState({ errorUsername: false });
    }
    if (!isPasswordValid(this.state.password)) {
      this.setState({ errorPassword: true });
      status = false;
    } else {
      this.setState({ errorPassword: false });
    }
    return status;
  };

  handleUsernameChange = e => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = e => {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };

  render() {
    return (
      <div id="signup-container">

        <TextField
          id="username"
          className="signup-field"
          hintText="Username"
          errorText={
            this.state.errorUsername ? 'Must be at least 4 characters long' : ''
          }
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyPress={this.handleKeyPress}
        />

        <TextField
          id="user-password"
          className="signup-field"
          hintText="Password"
          value={this.state.password}
          type="password"
          errorText={
            this.state.errorPassword
              ? 'Must contain at least 8 characters, a Capital Letter, a Number, a Special Symbol and'
              : ''
          }
          onChange={this.handlePasswordChange}
          onKeyPress={this.handleKeyPress}
        />

        <FlatButton
          id="signup-button"
          label="Create Account"
          backgroundColor={blue600}
          hoverColor={blue400}
          labelStyle={{ color: 'white' }}
          onTouchTap={this.handleSubmit}
        />

        <Dialog
          title="Dialog With Actions"
          actions={
            <FlatButton
              label="OK"
              backgroundColor={blue600}
              hoverColor={blue400}
              labelStyle={{ color: 'white' }}
              onClick={this.props.hideError}
            />
          }
          modal={true}
          open={this.props.errorDialog}
        >
          {this.props.errorMsg}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorDialog: state.ui.errorDialog,
  errorMsg: state.ui.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  signUp: (user, history) => {
    dispatch(signUp(user, history));
  },
  hideError: () => {
    dispatch(hideError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
