import React from 'react';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';

const SignUp = ({ newUser }) => (

  <div id="signup-container">
    <form name="signup" onSubmit={newUser}>
      <TextField id="user-email" />
      <TextField id="username"/>
      <TextField id="user-password" type="password" />
      <FlatButton label="Create Account" type="submit" />
    </form>
  </div>
);

const dispatchToProps = dispatch => ({
  newUser: () => {
    // e.preventDefault();
    dispatch()
  }
});

export default connect(null, dispatchToProps)(SignUp);
