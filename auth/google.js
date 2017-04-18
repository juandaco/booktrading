require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/users');
const passportUserSetup = require('./passportUserSetup');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      const searchQuery = {
        id: profile.id
      };

      // Customize your User
      const updates = {
        username: profile.name.givenName,
        name: profile.displayName,
        id: profile.id,
      };

      const options = {
        upsert: true,
        setDefaultsOnInsert: true
      };

      // update the user if s/he exists or add a new user
      Users.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

// serialize user into the session
passportUserSetup();

module.exports = passport;
