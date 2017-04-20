require('dotenv').config();
const express = require('express');
const booksRouter = express.Router();
const fetch = require('node-fetch');
// const Books = require('../models/users');

booksRouter.get('/search', function(req, res) {
  const searchTerm = req.query.term;
  // Error on empty search
  if (!searchTerm) return res.json({ errorMsg: 'Must include a search term' });
  // Google Books API Query URL to perform a Search
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}
    &projection=lite
    &langRestrict=en
    &filter=ebooks
    &key=${process.env.GOOGLE_BOOKS_API_KEY}`.replace(/\s/g, '');
  fetch(apiURL)
    .then(resp => resp.json())
    .then(data => {
      let formattedBooks = [];
      if (data.totalItems === 0) {
        return res.json({
          errorMsg: 'Books not Found'
        });
      }
      data.items.forEach(item => {
        // Get Data for each book Fount
        fetch(`${item.selfLink}?key=${process.env.GOOGLE_BOOKS_API_KEY}`)
          .then(resp => resp.json())
          .then(book => {
            const info = book.volumeInfo;
            const newBook = {
              id: book.id,
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

booksRouter.post('/:bookID', function(req, res) {});

booksRouter.get('/:page', function(req, res) {
  // Get from the DataBase
  res.json({
    items: ['temp', 'working', 'demo'],
  });
});

booksRouter.delete('/:bookID', function(req, res) {});

module.exports = booksRouter;
