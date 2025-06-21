import { Router } from "express";
import { createBook, getBooks, getSingleBook, updateBook } from "../controllers/bookController";

const bookRouter = Router();


bookRouter.post('/', createBook);
bookRouter.get('/', getBooks);
bookRouter.get('/:bookId', getSingleBook)
bookRouter.put('/:bookId', updateBook)

export default bookRouter;