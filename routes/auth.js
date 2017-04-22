const express = require('express');
const authRouter = express.Router();
const passportLocal = require('../auth/local');
const User = require('../models/user');

/*
  Local
*/
authRouter.post(
  '/login',
  passportLocal.authenticate('local'),
  function(req, res) {
    console.log(req.user);
    res.json({
      user: req.user
    });
  }
);

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
        message: 'User already exists',
      });
    }
  });
});

module.exports = authRouter;
