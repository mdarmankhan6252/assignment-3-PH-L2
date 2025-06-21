import { Request, Response } from "express";
import Book from "../models/bookModel";

export const createBook = async (req: Request, res: Response) => {
   try {
      const book = await Book.create(req.body);
      return res.status(201).json({
         success: true,
         message: "Book created successfully!",
         data: book
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Failed to create book!",
      })
   }
}