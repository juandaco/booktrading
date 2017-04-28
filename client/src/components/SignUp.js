import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/user';
import { hideInfoDialog } from '../actions/ui';
import { isPasswordValid, isUsernameValid } from '../helpers/inputValidation';
import { TextField, RaisedButton } from 'material-ui';
import InfoDialog from './InfoDialog';

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
    if (this.props.showDialog) {
      e.preventDefault();
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.props.hideInfoDialog();
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
          className="form-field"
          hintText="Username"
          errorText={
            this.state.errorUsername ? 'Must be at least 4 characters long' : ''
          }
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyPress={this.handleKeyPress}
          autoFocus
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

        <RaisedButton
          className="signup-button"
          label="Create Account"
          onTouchTap={this.handleSubmit}
        />

        <InfoDialog />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showDialog: state.ui.infoDialog.show,
});

const mapDispatchToProps = dispatch => ({
  signUp(user, history) {
    dispatch(signUp(user, history));
  },
  hideInfoDialog() {
    dispatch(hideInfoDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
