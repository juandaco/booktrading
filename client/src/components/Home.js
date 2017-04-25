import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';

const buttonStyle = {
  margin: 15,
};

const Home = ({ isUserLogged, logOut, history }) => {
  return (
    <div id="home-container">
      <div id="title-container">
        <h1 id="main-title">The Book Club</h1>
        <h2 id="main-sub01" className="main-subtitle">
          Trade books
        </h2>
        <h4 id="main-sub02" className="main-subtitle">
          Share knowledge
        </h4>
        <h5 id="main-sub03" className="main-subtitle">
          Improve the World!!!
        </h5>
      </div>
      <div id="home-button-container">
        {isUserLogged
          ? null
          : <div>
              <Link to="/signup">
                <RaisedButton
                  label="Sign Up"
                  style={buttonStyle}
                />
              </Link>
              <Link to="/login">
                <RaisedButton
                  label="Login"
                  style={buttonStyle}
                />
              </Link>
            </div>}
      </div>
    </div>
  );
};

export default connect(state => ({
  isUserLogged: Boolean(state.user.username),
}))(Home);
