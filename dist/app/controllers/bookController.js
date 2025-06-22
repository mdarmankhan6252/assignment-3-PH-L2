"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getBooks = exports.createBook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
// create book -> /api/books
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new bookModel_1.default(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully!",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book!",
        });
    }
});
exports.createBook = createBook;
// get all books -> /api/books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const valueOfLimit = limit ? parseInt(limit) : 10;
        const sortField = sortBy || 'createdAt';
        const sortOrder = sort === 'desc' ? -1 : 1;
        const query = {};
        if (filter) {
            query.genre = filter.toUpperCase();
        }
        const data = yield bookModel_1.default.find(query).sort({ [sortField]: sortOrder }).limit(valueOfLimit);
        res.status(200).send({
            success: true,
            message: 'Books retrieved successfully',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch the books'
        });
    }
});
exports.getBooks = getBooks;
// get single book -> /api/books/:bookId
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield bookModel_1.default.findById(bookId);
        res.status(200).send({
            success: true,
            message: 'Book retrieved successfully',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch the books'
        });
    }
});
exports.getSingleBook = getSingleBook;
// update a book -> /api/books/:bookId
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedDoc = req.body;
        const doc = yield bookModel_1.default.findByIdAndUpdate(bookId, updatedDoc, { new: true });
        res.status(200).send({
            success: true,
            message: 'Book updated successfully',
            data: doc
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update book'
        });
    }
});
exports.updateBook = updateBook;
// delete a book -> /api/books/:bookId
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield bookModel_1.default.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book'
        });
    }
});
exports.deleteBook = deleteBook;
