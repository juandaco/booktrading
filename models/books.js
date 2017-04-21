const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
  {
    bookID: {
      type: String,
      required: true,
    },
    title: String,
    subtitle: String,
    author: String,
    description: String,
    pageCount: Number,
    imageLink: String,
    isbn: Number,
    infoLink: String,
    publishedDate: Date,
    owners: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', Book);
