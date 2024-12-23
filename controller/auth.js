const Author = require('../model/auth');

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, birthYear } = req.body;

    // Check if the author already exists
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author already exists' });
    }

    // Create a new author
    const newAuthor = new Author({
      name,
      bio,
      birthYear,
    });

    // Save the new author to the database
    await newAuthor.save();

    // Respond with the newly created author
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a list of all authors
exports.getAllAuthors = async (req, res) => {
  try {
    // Find all authors
    const authors = await Author.find();

    // Return the list of authors
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get an author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Find author by ID
    const author = await Author.findById(authorId);

    // If no author found
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Return the author details
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an author by ID
exports.updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name, bio, birthYear } = req.body;

    // Find the author and update details
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { name, bio, birthYear },
      { new: true } // Return the updated document
    );

    // If no author found
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Return the updated author
    res.json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an author by ID
exports.deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Find the author and delete
    const deletedAuthor = await Author.findByIdAndDelete(authorId);

    // If no author found
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Return the deleted author info
    res.json({ message: 'Author deleted successfully', author: deletedAuthor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
