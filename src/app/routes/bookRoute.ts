import { Router } from "express";
import { createBook } from "../controllers/bookController";

const bookRouter = Router();


bookRouter.post('/', createBook)

export default bookRouter;