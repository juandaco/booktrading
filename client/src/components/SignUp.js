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
      passwordConfirm: '',
      errorUsername: false,
      errorPassword: false,
      errorPasswordConfirm: false,
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (this.props.errorDialog) {
      e.preventDefault();
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.props.hideError();
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isInputValid()) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
      e.target.blur();
      const { signUp } = this.props;
      signUp(user, this.props.history);
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
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ errorPasswordConfirm: true });
      status = false;
    } else {
      this.setState({ errorPasswordConfirm: false });
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

  handlePasswordConfirmChange = e => {
    e.preventDefault();
    this.setState({
      passwordConfirm: e.target.value,
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
          className="form-field"
          hintText="Password"
          value={this.state.password}
          type="password"
          errorText={
            this.state.errorPassword
              ? 'Password Rules: 8 characters minimum, a Capital Letter, a Number, and no Spaces'
              : ''
          }
          onChange={this.handlePasswordChange}
          onKeyPress={this.handleKeyPress}
        />

        <TextField
          className="form-field"
          hintText="Confirm Password"
          value={this.state.passwordConfirm}
          type="password"
          errorText={
            this.state.errorPasswordConfirm ? `Password doesn't match` : ''
          }
          onChange={this.handlePasswordConfirmChange}
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
          title="Something Wrong"
          actions={
            <FlatButton
              label="OK"
              backgroundColor={blue600}
              hoverColor={blue400}
              labelStyle={{ color: 'white' }}
              onClick={this.props.hideError}
            />
          }
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
