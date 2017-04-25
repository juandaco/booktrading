const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');

usersRouter.put('/', verifyUser, function(req, res, next) {
  const { fullName, city, stateLocation } = req.body;
  User.updateOne(
    { _id: req.user._id },
    { $set: { fullName, city, stateLocation } }
  )
    .then(resp => {
      if (resp.ok)
        res.json({
          message: 'Profile Updated',
        });
    })
    .catch(err => {
      console.log(err);
      res.json({
        errorMsg: 'Profile not Updated',
      });
    });
});

module.exports = usersRouter;
