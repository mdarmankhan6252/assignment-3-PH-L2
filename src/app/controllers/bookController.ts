import { Request, Response } from "express";
import Book from "../models/bookModel";

// create book -> api/books

export const createBook = async (req: Request, res: Response) => {
   try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json({
         success: true,
         message: "Book created successfully!",
         data: book
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to create book!",
      })
   }
}


// get all books -> api/books

export const getBooks = async (req: Request, res: Response) => {
   try {

      const { filter, sortBy, sort, limit } = req.query;

      const valueOfLimit = limit ? parseInt(limit as string) : 10;
      const sortField = (sortBy as string) || 'createdAt';
      const sortOrder = sort === 'desc' ? -1 : 1;

      const query: any = {};
      if (filter) {
         query.genre = (filter as string).toUpperCase();
      }


      const data = await Book.find(query).sort({ [sortField]: sortOrder }).limit(valueOfLimit)
      res.status(200).send({
         success: true,
         message: 'Books retrieved successfully',
         data
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to fetch the books'
      })
   }
}


// get single book -> api/books/:bookId

export const getSingleBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;
      const data = await Book.findById(bookId);
      res.status(200).send({
         success: true,
         message: 'Book retrieved successfully',
         data
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to fetch the books'
      })
   }

}


// update a book -> /api/books/:bookId

export const updateBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;
      const updatedDoc = req.body || {};

      if(!updatedDoc){
         res.status(404).json({
            success: false,
            message: "Book data is missing!"
         })
      }

      const doc = await Book.findByIdAndUpdate(bookId, updatedDoc, { new: true })


      res.status(200).send({
         success: true,
         message: 'Book updated successfully',
         data: doc
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to update book'
      })
   }
}