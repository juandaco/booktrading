const express = require('express');
const authRouter = express.Router();
const passportLocal = require('../auth/local');
const User = require('../models/user');

/*
  Local Strategy
*/
authRouter.post('/signup', function(req, res, next) {
  // Send Error if username or passsword field not found
  if (!req.body.username || !req.body.password) {
    const errorMsg = 'Need username and password to sign up';
    res.status(400).json({
      errorMsg,
    });
  }
  //
  User.findOne({ username: req.body.username }).then(function(user) {
    if (!user) {
      let newUser = new User();
      newUser.username = req.body.username;
      newUser.password = newUser.generateHash(req.body.password);

      newUser
        .save()
        .then(user => {
          if (user)
            res.json({
              message: 'User Correctly Created',
            });
        })
        .catch(err => {
          return next(err);
        });
    } else {
      res.json({
        errorMsg: 'This username already exists, please choose another option',
      });
    }
  });
});

authRouter.post('/login', function(req, res, next) {
  passportLocal.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      return res.json({
        errorMsg: 'Incorrect Username or Password',
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          errorMsg: 'Could not log in user',
        });
      }
      // Remove Private User data befor sending User Info
      let formattedUser = Object.assign({}, user._doc);
      delete formattedUser._id;
      delete formattedUser.__v;
      delete formattedUser.updatedAt;
      delete formattedUser.createdAt;
      delete formattedUser.password;
      return res.json({
        user: formattedUser,
      });
    });
  })(req, res, next);
});

authRouter.post('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'User logged out',
    });
  } else {
    res.json({
      errorMsg: 'User not logged in',
    });
  }
});

authRouter.get('/user-session', function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(
      { _id: req.user._id },
      {
        _id: false,
        __v: false,
        updatedAt: false,
        createdAt: false,
        password: false,
      },
      function(err, user) {
        if (err) throw err;
        res.json({
          user,
        });
      }
    );
  } else {
    res.json({
      errorMsg: 'You need to login first',
    });
  }
});

module.exports = authRouter;
