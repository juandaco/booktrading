import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTradeRequest } from '../actions/user';
import { hideTradeDialog } from '../actions/ui';
import { Dialog, FlatButton } from 'material-ui';
import { white, blue600, blue300 } from 'material-ui/styles/colors';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const buttonStyle = {
  marginLeft: 5,
};

class TradeDialog extends Component {
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (this.props.show) {
      e.preventDefault();
      if (e.keyCode === 13) {
        this.handleTradeRequest();
        console.log('Send Trade Request');
      }
    }
  };

  handleTradeRequest = () => {
    const { bookID,  requestTrade, hideTradeDialog } = this.props;
    const owner = this.refs.ownersGroup.state.selected;
    requestTrade(bookID, owner);
    hideTradeDialog();
  }

  render() {
    const { show, bookID, owners, hideTradeDialog } = this.props;
    const ownerChoice = owners.map(owner => {
      let labelText = owner.username;
      if (owner.city && owner.stateLocation) {
        labelText += ` - ${owner.city}, ${owner.stateLocation}`;
      } else if (owner.city || owner.stateLocation) {
        labelText += ` - ${owner.city || owner.stateLocation}`;
      }
      return (
        <RadioButton
          key={`${bookID}-${owner.username}`}
          value={owner.username}
          label={labelText}
          style={{ marginBottom: 10 }}
        />
      );
    });

    return (
      <Dialog
        className="info-dialog"
        actions={
          <div>
            <FlatButton
              label="Cancel"
              style={buttonStyle}
              backgroundColor={blue600}
              hoverColor={blue300}
              labelStyle={{ color: white }}
              onClick={hideTradeDialog}
            />
            <FlatButton
              label="Send"
              style={buttonStyle}
              backgroundColor={blue600}
              hoverColor={blue300}
              labelStyle={{ color: white }}
              onClick={this.handleTradeRequest}
            />
          </div>
        }
        open={show}
        onRequestClose={() => this.props.hideTradeDialog()}
        autoScrollBodyContent={true}
        actionsContainerStyle={{ border: 'none' }}
      >
        <RadioButtonGroup
          name="owner-choice"
          ref="ownersGroup"
          defaultSelected={owners.length ? owners[0].username : ''}
          children={ownerChoice}
        />
      </Dialog>
    );
  }
}

export default connect(
  (
    state = {
      show: false,
      bookID: '',
      owners: [],
    },
  ) => {
    return {
      show: state.ui.tradeDialog.show,
      bookID: state.ui.tradeDialog.bookID,
      owners: state.ui.tradeDialog.owners,
    };
  },
  dispatch => ({
    hideTradeDialog: () => {
      dispatch(hideTradeDialog());
    },
    requestTrade: (bookID, owner) => {
      dispatch(sendTradeRequest(bookID, owner));
    }
  }),
)(TradeDialog);
