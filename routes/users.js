const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');

usersRouter.put('/current', verifyUser, function(req, res, next) {
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

usersRouter.get('/details', verifyUser, function(req, res, next) {
  User.find(
    { ownedBooks: { $elemMatch: { $eq: req.query.bookID } } },
    { username: true, city: true, stateLocation: true, _id: false }
  )
    .lean()
    .exec()
    .then(owners => {
      res.json({
        message: 'User Details',
        owners,
      });
    })
    .catch(err => console.log(err));
});

module.exports = usersRouter;
