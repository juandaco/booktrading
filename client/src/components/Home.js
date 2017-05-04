import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import BookIcon from 'material-ui/svg-icons/action/book';
import BulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import WorldIcon from 'material-ui/svg-icons/action/language';

const buttonStyle = {
  margin: 15,
};

const iconStyle = {
  width: 36,
  height: 36,
  color: 'rgba(255, 255, 255, 0.8)',
  marginRight: 5,
  verticalAlign: 'middle',
};

const Home = ({ isUserLogged, logOut, history }) => {
  return (
    <div id="home-container">
      <div id="title-container">
        <div id="main-image" />
        <h1 id="main-title">The Book Club</h1>
        <h2 id="main-sub01" className="main-subtitle">
          <BookIcon style={iconStyle} />
          Trade books
        </h2>
        <h4 id="main-sub02" className="main-subtitle">
          <BulbIcon
            style={Object.assign({}, iconStyle, { width: 30, height: 30 })}
          />
          Share knowledge
        </h4>
        <h5 id="main-sub03" className="main-subtitle">
          <WorldIcon style={Object.assign({}, iconStyle, { width: 20, height: 20 })} />
          Improve the World!!!
        </h5>
      </div>
      <div id="home-button-container">
        {isUserLogged
          ? null
          : <div>
              <Link to="/signup">
                <RaisedButton label="Sign Up" style={buttonStyle} />
              </Link>
              <Link to="/login">
                <RaisedButton label="Login" style={buttonStyle} />
              </Link>
            </div>}
      </div>
    </div>
  );
};

export default connect(state => ({
  isUserLogged: Boolean(state.user.username),
}))(Home);
