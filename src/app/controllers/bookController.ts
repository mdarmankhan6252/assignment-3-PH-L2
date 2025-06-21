import { Request, Response } from "express";
import Book from "../models/bookModel";

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