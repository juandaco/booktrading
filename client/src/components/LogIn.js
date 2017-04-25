import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendLogin } from '../actions/user';
import { hideDialog } from '../actions/ui';
import { TextField, RaisedButton } from 'material-ui';
import InfoDialog from './InfoDialog';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUsername: false,
      errorPassword: false,
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (this.props.dialog) {
      e.preventDefault();
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.props.hideDialog();
      }
    }
  };

  isInputValid = () => {
    if (this.state.username.length && this.state.password.length) {
      return true;
    } else {
      return false;
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
      this.props.sendLogin(user, this.props.history);
    }
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
      <div id="login-container">

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

        <RaisedButton
          className="login-button"
          label="Login"
          onTouchTap={this.handleSubmit}
        />

        <InfoDialog title="Something Wrong" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.ui.dialog,
  dialogText: state.ui.dialogText,
});

const mapDispatchToProps = dispatch => ({
  sendLogin: (user, history) => {
    dispatch(sendLogin(user, history));
  },
  hideDialog: () => {
    dispatch(hideDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
