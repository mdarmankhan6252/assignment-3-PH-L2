import { Request, Response } from "express";
import Borrow from "../models/borrowModel";
import mongoose from "mongoose";
import Book from "../models/bookModel";


// create a borrow of a book -> /api/borrow

export const borrowABook = async (req: Request, res: Response) => {
   try {
      const { book, quantity, dueDate } = new Borrow(req.body);

      if (!mongoose.Types.ObjectId.isValid(book)) {
         return res.status(400).json({
            success: false,
            message: "Invalid Book ID format",
         })
      }

      const bookDoc = await Book.findById(book);
      console.log(bookDoc);

      if(!bookDoc){
        return res.status(404).json({
            success: false, 
            message: 'Book Not found!',
         })
      }

      if(bookDoc?.copies < quantity){
         return res.status(400).json({
            success: false, 
            message:  "Not enough copies available"
         })
      }

      bookDoc.copies -= quantity;

      bookDoc?.checkAvailability();

      await bookDoc?.save();

      const borrow = await Borrow.create({
         book,
         quantity,
         dueDate
      })

      res.status(201).json({
         success: true,
         message: 'Book borrowed successfully',
         data: borrow
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to borrow a book.'
      })
   }
}


// borrow a book -> /api/borrow

export const getBorrowBooksSummary = async (req: Request, res: Response) => {
   try {

      const data = await Borrow.find({}, { quantity: 1 })
         .populate({
            path: 'book',
            select: 'title isbn'
         })

      res.status(200).json({
         success: true,
         message: "Borrowed books summary retrieved successfully",
         data
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to fetch borrow data."
      })
   }
}