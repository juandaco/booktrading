import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/user';
import { TextField, FlatButton } from 'material-ui';
import { white, blue600, blue400 } from 'material-ui/styles/colors';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      city: '',
      stateLocation: '',
    };
  }

  handleUpdate = () => {
    const profile = {
      fullName: this.state.fullName || this.props.fullName,
      city: this.state.city || this.props.city,
      stateLocation: this.state.stateLocation || this.props.stateLocation,
    };
    this.props.updateProfile(profile);
    this.clearState();
  };

  clearState = () => {
    this.setState({
      fullName: '',
      city: '',
      stateLocation: '',
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleUpdate();
    }
  };

  render() {
    return (
      <div className="component-container">
        <div id="profile-container">
          <form onSubmit={this.handleUpdate}>
            <TextField
              name="full-name"
              hintText={
                this.props.fullName ? this.props.fullName : 'Full Name '
              }
              onChange={e => this.setState({ fullName: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.fullName}
            />
            <TextField
              name="city"
              hintText={this.props.city ? this.props.city : 'City'}
              onChange={e => this.setState({ city: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.city}
            />
            <TextField
              name="state"
              hintText={
                this.props.stateLocation ? this.props.stateLocation : 'State'
              }
              onChange={e => this.setState({ stateLocation: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.stateLocation}
            />
            <FlatButton
              id="signup-button"
              label="Update"
              type="submit"
              backgroundColor={blue600}
              hoverColor={blue400}
              labelStyle={{ color: white }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    fullName: state.user.fullName,
    city: state.user.city,
    stateLocation: state.user.stateLocation,
  }),
  dispatch => ({
    updateProfile: profile => {
      dispatch(updateProfile(profile));
    },
  }),
)(Profile);
