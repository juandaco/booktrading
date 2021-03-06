require('dotenv').config();
const express = require('express');
const booksRouter = express.Router();
const fetch = require('node-fetch');
const Books = require('../models/books');
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');
const getISBN = require('../helpers/getISBN');

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
      let bookErrors = 0;
      data.items.forEach(item => {
        // Get Data for each book Found
        fetch(`${item.selfLink}?key=${process.env.GOOGLE_BOOKS_API_KEY}`)
          .then(resp => resp.json())
          .then(book => {
            if (!book.error) {
              const info = book.volumeInfo;
              const isbn = getISBN(info.industryIdentifiers);
              const newBook = {
                bookID: book.id,
                title: info.title,
                subtitle: info.subtitle || '',
                author: Array.isArray(info.authors) && info.authors.length
                  ? info.authors[0]
                  : '',
                description: info.description,
                pageCount: info.pageCount,
                imageLink: info.imageLinks
                  ? info.imageLinks.small.replace(/http:/g, 'https:')
                  : '',
                isbn,
                infoLink: info.infoLink,
                publishedDate: info.publishedDate,
              };
              formattedBooks.push(newBook);
            } else {
              bookErrors++;
            }
            // Send answer   when done with the last book
            if (formattedBooks.length + bookErrors === data.items.length) {
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
          newBook.owners = [req.user.username];
          book = new Books(newBook);
          book.save(newBook, function(err, data) {
            if (err) throw err;
            res.json({
              message: 'Book Added',
            });
          });
        } else {
          if (!book.owners.includes(req.user.username)) {
            book.owners.push(req.user.username);
            book.save(function(err, data) {
              if (err) throw err;
              res.json({
                message: 'User Added',
              });
            });
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        errorMsg: 'Something went wrong',
      });
    });
});

booksRouter.delete('/', verifyUser, function(req, res) {
  const { bookID } = req.body;
  // Delete book from User in session
  User.updateOne(
    { _id: req.user._id },
    {
      $pull: {
        ownedBooks: bookID,
        incomingRequests: { bookID },
      },
    }
  ).then(resp => {
    // Error Checking befor Deleting Book
    if (!resp.nModified) throw new Error('');
    // Remove Trade Requests Asociated with the Book
    User.updateMany(
      {},
      {
        $pull: {
          requestedBooks: { bookID, owner: req.user.username },
        },
      }
    )
      .then(resp => {
        // Update the Books Collection
        Books.findOne({ bookID: req.body.bookID }).then(book => {
          if (book.owners.length === 1) {
            book.remove(function(err) {
              if (err) throw err;
              res.json({
                message: 'Book Deleted',
              });
            });
          } else {
            const ownerIndex = book.owners.findIndex(
              owner => owner === req.user.username
            );
            if (ownerIndex > -1) book.owners.splice(ownerIndex, 1);
            book.save(function(err) {
              if (err) throw err;
              res.json({
                message: 'Owner Deleted',
              });
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          errorMsg: 'Book Not Deleted',
        });
      });
  });
});

booksRouter.get('/', function(req, res) {
  Books.find({}, { _id: false, updatedAt: false, createdAt: false, __v: false })
    .lean()
    .exec(function(err, books) {
      if (err) throw err;
      res.json(books);
    });
});

module.exports = booksRouter;
