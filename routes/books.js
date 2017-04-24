require('dotenv').config();
const express = require('express');
const booksRouter = express.Router();
const fetch = require('node-fetch');
const Books = require('../models/books');
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');

// Search  Google Books API
booksRouter.get('/search', function(req, res) {
  const searchTerm = req.query.term;
  // Error on empty search
  if (!searchTerm) return res.json({ errorMsg: 'Must include a search term' });
  // Google Books API Query URL to perform a Search
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}
    &projection=lite
    &printType=books
    &orderBy=relevance
    &langRestrict=en
    &key=${process.env.GOOGLE_BOOKS_API_KEY}`.replace(/\s/g, '');
  fetch(apiURL)
    .then(resp => resp.json())
    .then(data => {
      let formattedBooks = [];
      if (data.totalItems === 0) {
        return res.json({
          errorMsg: 'Books not Found',
        });
      }
      data.items.forEach(item => {
        // Get Data for each book Found
        fetch(`${item.selfLink}?key=${process.env.GOOGLE_BOOKS_API_KEY}`)
          .then(resp => resp.json())
          .then(book => {
            const info = book.volumeInfo;
            const newBook = {
              bookID: book.id,
              title: info.title,
              subtitle: info.subtitle || '',
              author: Array.isArray(info.authors) && info.authors.length
                ? info.authors[0]
                : '',
              description: info.description,
              pageCount: info.pageCount,
              imageLink: info.imageLinks ? info.imageLinks.small : '',
              isbn: Array.isArray(info.industryIdentifiers) &&
                info.industryIdentifiers.length
                ? info.industryIdentifiers[0].identifier
                : '',
              infoLink: info.infoLink,
              publishedDate: info.publishedDate,
            };
            formattedBooks.push(newBook);
            // Send answer   when done with the last book
            if (formattedBooks.length === data.items.length) {
              res.json(formattedBooks);
            }
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
});

// Add Books
booksRouter.post('/', verifyUser, function(req, res) {
  // Add Book to User
  let newBook = req.body.book;
  User.updateOne(
    { _id: req.user._id },
    { $addToSet: { ownedBooks: newBook.bookID } }
  )
    .then(resp => {
      // Add to Book Collection or Update the Owners List
      Books.findOne({ bookID: newBook.bookID }, function(err, book) {
        if (err) throw err;
        if (!book) {
          newBook['owners'] = [req.user.username];
          book = new Books(newBook);
        } else {
          book.owners.push(req.user.username);
        }
        book.save(newBook, function(err, data) {
          if (err) throw err;
        });
        res.json({
          message: 'Book Added',
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        errorMsg: 'Something went wrong',
      });
    });
});

booksRouter.delete('/:bookID', verifyUser, function(req, res) {
  // Delete book from the Book collection AND from the User in session
  /*
    Logic Steps 
      1. Verify User LoggedIn Security (Express Middleware)
      2. Verify User Ownership
        a. Remove from User owned Books
      3. Remove User From Book owners field
        a. If no owners left in Book, Delete Book from Collection
      4. Send confirmation Message
  */
});

booksRouter.get('/:page', function(req, res) {
  Books.find().lean().exec(function(err, books){
    if (err) throw err;
    res.json(books);
  });
});

module.exports = booksRouter;
