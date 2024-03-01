const Book = require("../models/Book");
const joi = require("joi");

const getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const schema = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    author: joi.string().required(),
    category: joi.alternatives().try(joi.string(), joi.allow(null)),
    dateReleased: joi.date().required(),
    sizeInMB: joi.number().required(),
    numberOfPages: joi.number().required(),
    language: joi.string().required(),
    summary: joi.string().required(),
    image: joi.string(),
  });

  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (value.category === '') {
      value.category = null;
    }
    const newBook = new Book(value);
    await newBook.save();

    res.status(201).json({
      book: newBook,
      message: `${newBook.title} created successfully`,
    });
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
   if(!req.is_admin) return res.status(400).json({message:"Vous n'avez pas le droit de modifier book."})
  const schema = joi
    .object({
      title: joi.string(),
      price: joi.number(),
      author: joi.string(),
      category: joi.alternatives().try(joi.string(), joi.allow(null)),
      dateReleased: joi.date(),
      sizeInMB: joi.number(),
      numberOfPages: joi.number(),
      language: joi.string(),
      summary: joi.string(),
      image: joi.string(),
    })
    .min(1);

  try {
    const { id } = req.params;
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (value.category === '') {
      value.category = null;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({
      book: updatedBook,
      message: `${updatedBook.title} updated successfully`,
    });
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
   if(!req.is_admin) return res.status(400).json({message:"Vous n'avez pas le droit de supprimer book."})
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({
      message: `Book '${book.title}' removed successfully`,
    });
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};
const getBooksByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.find({ category: id }).populate("category");

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllBooksPopulate = async (req, res) => {
  try {
    const books = await Book.find().populate("category");

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateManyByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;

    const updatedBooks = await Book.updateMany(
      { category: categoryId },
      { $set: { category } },
      { new: true }
    );

    if (updatedBooks.n === 0) {
      return res.status(404).json({ message: 'No books found for the specified categoryId' });
    }

    res.status(200).json({
      message: `${updatedBooks.n} books updated successfully`,
    });
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getBooksByCategory,
  getAllBooksPopulate,
  updateManyByCategory
};
