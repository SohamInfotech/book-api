const mongoose = require('mongoose');

// Define the schema for an Author
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  birthYear: { type: Number },
});

// Create and export the Author model
module.exports = mongoose.model('Author', authorSchema);
