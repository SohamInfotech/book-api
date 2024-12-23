const mongoose = require('mongoose');

// Define the schema for a Book
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  description: { type: String, required: true },
  // Add a reference to the Author model
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
});

// Create and export the Book model
module.exports = mongoose.model('Book', bookSchema);
