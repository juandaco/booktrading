require('dotenv').config();
const express = require('express');
const booksRouter = express.Router();
const fetch = require('node-fetch');
// const Books = require('../models/users');

booksRouter.get('/search', function(req, res) {
  const searchTerm = req.query.term;
  if (!searchTerm) return res.json({ errorMsg: 'Must include a search term' });
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}
    &langRestrict=en
    &key=${process.env.GOOGLE_BOOKS_API_KEY}`.replace(/\s/g, '');
  fetch(apiURL)
    .then(resp => resp.json())
    .then(data => {
      const formattedData = data.items.map(book => {
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
          imageLink: info.imageLinks ? info.imageLinks.thumbnail : '',
          isbn: Array.isArray(info.industryIdentifiers) &&
            info.industryIdentifiers.length
            ? info.industryIdentifiers[0].identifier
            : '',
          infoLink: info.infoLink,
          publishedDate: info.publishedDate,
        };
        return newBook;
      });
      res.json(formattedData);
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
