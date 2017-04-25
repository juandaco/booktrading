const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const BookTrade = {
  bookID: String,
  owner: String,
  status: Boolean,
};

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    stateLocation: String,
    city: String,
    ownedBooks: [String], // By BookID
    tradeRequests: [BookTrade],
  },
  {
    timestamps: true,
  }
);

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
