import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendProfileUpdate } from '../actions/user';
import { TextField, RaisedButton } from 'material-ui';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      city: '',
      stateLocation: '',
    };
  }

  handleUpdate = e => {
    e.preventDefault();
    if (this.state.fullName || this.state.city || this.state.stateLocation) {
      const profile = {
        fullName: this.state.fullName || this.props.fullName,
        city: this.state.city || this.props.city,
        stateLocation: this.state.stateLocation || this.props.stateLocation,
      };
      this.props.updateProfile(profile);
      this.clearState();
    }
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
      this.handleUpdate(e);
    }
  };

  render() {
    return (
      <div className="component-container">
        <div id="profile-container">
          <form onSubmit={this.handleUpdate}>

            <TextField
              name="full-name"
              hintText={this.props.fullName ? this.props.fullName : 'Full Name'}
              floatingLabelText="Full Name"
              floatingLabelFixed
              onChange={e => this.setState({ fullName: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.fullName}
            />

            <TextField
              name="city"
              hintText={this.props.city ? this.props.city : 'City'}
              floatingLabelText="City"
              floatingLabelFixed
              onChange={e => this.setState({ city: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.city}
            />

            <TextField
              name="state"
              hintText={
                this.props.stateLocation ? this.props.stateLocation : 'State'
              }
              floatingLabelText="State"
              floatingLabelFixed
              onChange={e => this.setState({ stateLocation: e.target.value })}
              onKeyPress={this.handleKeyPress}
              value={this.state.stateLocation}
            />

            <RaisedButton
              label="Update"
              type="submit"
              style={{
                marginTop: 30,
              }}
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
    updateProfile(profile) {
      dispatch(sendProfileUpdate(profile));
    },
  }),
)(Profile);
