const Book = require('../model/book');
const Author = require('../model/auth');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear, description } = req.body;

    // Check if the author exists
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Create a new book
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      description
    });

    // Save the new book to the database
    await newBook.save();

    // Respond with the newly created book
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name bio birthYear');  // Populating author data
    
    // Respond with the list of books
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId)
      .populate('author', 'name bio birthYear');  // Populating author data

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search for books based on title, author, or genre
exports.searchBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    let query = {};

    // Build query based on the provided parameters
    if (title) query.title = { $regex: title, $options: 'i' };  // Case-insensitive search
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };

    // Find books based on the query and populate author data
    const books = await Book.find(query).populate('author', 'name bio birthYear');

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre, publishedYear, description } = req.body;

    // Find and update the book by ID
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, genre, publishedYear, description },
      { new: true }  // Return the updated document
    ).populate('author', 'name bio birthYear');  // Populating author data

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
