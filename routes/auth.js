const express = require('express');
const router = express.Router();
const authorController = require('../controller/auth');

// Route to create a new author
router.post('/add', authorController.createAuthor);

// Route to get all authors
router.get('/', authorController.getAllAuthors);

// Route to get a specific author by ID
router.get('/:id', authorController.getAuthorById);

// Route to update an author by ID
router.put('/:id', authorController.updateAuthor);

// Route to delete an author by ID
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
