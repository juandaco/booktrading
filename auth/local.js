require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passportUserSetup = require('./passportUserSetup');

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('Incorrect Username');
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log('Incorrect Password');
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// serialize user into the session
passportUserSetup();

module.exports = passport;
