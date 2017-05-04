import React from 'react';

const googleLogoStyle = {
  marginTop: -15,
  width: 150,
};

const About = () => {
  return (
    <div className="component-container">
      <h3 style={{ marginTop: 40 }}>Created by</h3>
      <a href="https://www.freecodecamp.com/juandaco" target="_blank">
        <h2 id="syntart-logo">Synt4rt</h2>
      </a>
      <h3>for</h3>
      <a href="https://www.freecodecamp.com" target="_blank">
        <h2 id="freecodecamp-logo">
          freeCodeCamp
          <i className="fa fa-free-code-camp" aria-hidden="true" />
        </h2>
      </a>
      <h4>
        Powered by
      </h4>
      <a href="https://books.google.com" target="_blank">
        <div style={{ position: 'relative' }}>
          <img
            style={googleLogoStyle}
            src="https://www.google.com/intl/en_ALL/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google Books Logo"
          />
          <p
            style={{
              fontSize: 14,
              position: 'absolute',
              right: -9,
              bottom: -12,
              color: '#4285f4',
            }}
          >
            Books
          </p>
        </div>
      </a>
    </div>
  );
};

export default About;
