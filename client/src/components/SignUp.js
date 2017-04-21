import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { newUser } from '../actions/user';
import { TextField, FlatButton } from 'material-ui';
import { blue600 } from 'material-ui/styles/colors';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.inputValidation()) {
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      this.clearState();
      // Dispatch action for Creating New User
      this.props.dispatch(newUser(user));
    }
  };

  inputValidation = () => {
    // Boolean value depending on checks performed

    return true;
  };

  clearState = () => {
    this.setState({
      email: '',
      username: '',
      password: '',
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

  render() {
    return (
      <div id="signup-container">
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="user-email"
            hintText="E-mail"
            onChange={this.handleEmailChange}
          />
          <TextField
            id="username"
            hintText="Username"
            onChange={this.handleUsernameChange}
          />
          <TextField
            id="user-password"
            hintText="Password"
            type="password"
            onChange={this.handlePasswordChange}
          />
          <FlatButton
            id="signup-button"
            label="Create Account"
            type="submit"
            backgroundColor={blue600}
            labelStyle={{ color: 'white' }}
          />
        </form>
        {/*
          Error Messages
        */}
      </div>
    );
  }
}

export default SignUp;
