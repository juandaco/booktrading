import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { newUser } from '../actions/user';
import { TextField, FlatButton } from 'material-ui';
import { blue600, blue400 } from 'material-ui/styles/colors';
import isEmail from 'validator/lib/isEmail';
import { isPasswordValid, isUsernameValid } from '../helpers/isPasswordValid';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      errorEmail: false,
      errorUsername: false,
      errorPassword: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isInputValid()) {
      // const user = {
      //   email: this.state.email,
      //   username: this.state.username,
      //   password: this.state.password,
      // };
      this.clearState();
      // CleanUp State
      // Dispatch action for Creating New User
      // this.props.dispatch(newUser(user));
    }
  };

  isInputValid = () => {
    let status = true;
    if (!isEmail(this.state.email)) {
      this.setState({ errorEmail: true });
      status = false;
    } else {
      this.setState({ errorEmail: false });
    }

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

  clearState = () => {
    this.setState({
      email: '',
      username: '',
      password: '',
      errorEmail: false,
      errorUsername: false,
      errorPassword: false,
    });
  };

  handleEmailChange = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
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
          id="user-email"
          className="signup-field"
          hintText="E-mail"
          errorText={this.state.errorEmail ? 'Please add a valid email' : ''}
          value={this.state.email}
          onChange={this.handleEmailChange}
          onKeyPress={this.handleKeyPress}
        />

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
        {/*
          Error Messages
        */}
      </div>
    );
  }
}

export default SignUp;
