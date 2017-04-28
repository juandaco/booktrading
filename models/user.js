const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const InTrade = new Schema(
  {
    bookID: String,
    user: String,
    status: String,
  },
  { _id: false }
);

const Trade = new Schema(
  {
    bookID: String,
    owner: String,
    status: String,
  },
  { _id: false }
);

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    stateLocation: String,
    city: String,
    ownedBooks: [String], // By BookID
    incomingRequests: [InTrade],
    requestedBooks: [Trade],
    // messages: []
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
