const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');

// Route to search for books
router.get('/search', bookController.searchBooks);

// Route to create a new book
router.post('/add', bookController.createBook);

// Route to get all books
router.get('/', bookController.getAllBooks);

// Route to get a book by ID
router.get('/:id', bookController.getBookById);

// Route to update a book by ID
router.put('/:id', bookController.updateBook);

// Route to delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
