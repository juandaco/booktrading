const express = require('express');
const booksRouter = express.Router();
// const Books = require('../models/users');

booksRouter.get('/:page', function(req,res){
  res.json({
    items: ['temp', 'working', 'demo']
  });
});


module.exports = booksRouter;