const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookTrade = {
  bookID: String,
  owner: String,
};

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: String,
    fullName: String,
    state: String,
    city: String,
    ownedBooks: [String], // By BookID
    tradeRequests: [BookTrade],
    acceptedTradeRequests: [BookTrade],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', User);
