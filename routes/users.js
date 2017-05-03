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

usersRouter.put('/trade', verifyUser, function(req, res, next) {
  const { action, bookID, owner, user: userRequesting, status } = req.body;

  if (action === 'ADD') {
    const inTrade = {
      bookID,
      user: req.user.username,
      status,
    };
    // Update Owner of Incoming Request
    User.findOneAndUpdate(
      { username: owner },
      { $addToSet: { incomingRequests: inTrade } }
    )
      .then(userOwner => {
        const trade = {
          bookID,
          owner,
          status,
        };
        // Add to Requested Books to current User
        User.updateOne(
          { _id: req.user._id },
          { $addToSet: { requestedBooks: trade } }
        ).then(resp => {
          if (resp.nModified) {
            res.json({
              message: 'Trade Requested',
            });
          }
        });
      })
      .catch(err => console.log(err));
  } else if (action === 'ACCEPT') {
    // Update User in Session
    User.updateOne(
      {
        _id: req.user._id,
        incomingRequests: {
          $elemMatch: {
            bookID,
            user: userRequesting,
          },
        },
      },
      { $set: { 'incomingRequests.$.status': 'Accepted' } }
    )
      .then(resp => {
        if (resp.nModified) {
          // Update Requesting User
          User.updateOne(
            {
              username: userRequesting,
              requestedBooks: {
                $elemMatch: { bookID, owner: req.user.username },
              },
            },
            {
              $set: { 'requestedBooks.$.status': 'Accepted' },
            }
          ).then(response => {
            if (response.nModified)
              res.json({
                message: 'Trade Accepted',
              });
          });
        }
      })
      .catch(err => console.log(err));
  } else if (action === 'DECLINE') {
    User.updateOne(
      {
        _id: req.user._id,
        incomingRequests: {
          $elemMatch: {
            bookID,
            user: userRequesting,
          },
        },
      },
      { $set: { 'incomingRequests.$.status': 'Rejected' } }
    )
      .then(resp => {
        if (resp.nModified) {
          // Update Requesting User
          User.updateOne(
            {
              username: userRequesting,
              requestedBooks: {
                $elemMatch: {
                  bookID,
                  owner: req.user.username,
                },
              },
            },
            {
              $set: { 'requestedBooks.$.status': 'Rejected' },
            }
          ).then(response => {
            if (response.nModified)
              res.json({
                message: 'Trade Rejected',
              });
          });
        }
      })
      .catch(err => console.log(err));
  }
});

module.exports = usersRouter;
