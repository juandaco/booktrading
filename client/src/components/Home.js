import React from 'react';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import { white, blue600 } from 'material-ui/styles/colors';

const buttonStyle = {
  margin: 15,
};

const Home = () => {
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
        <Link to="/signup">
          <RaisedButton
            label="Sign Up"
            style={buttonStyle}
            backgroundColor={blue600}
            labelColor={white}
          />
        </Link>
        <RaisedButton
          label="Sign In"
          style={buttonStyle}
          backgroundColor={blue600}
          labelColor={white}
        />
      </div>
    </div>
  );
};

export default Home;
