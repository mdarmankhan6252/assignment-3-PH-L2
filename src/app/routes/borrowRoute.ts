import { Router } from "express";
import { borrowABook, getBorrowBooksSummary } from "../controllers/borrowController";


const borrowRouter = Router();

borrowRouter.post('/', borrowABook)
borrowRouter.get('/', getBorrowBooksSummary)

export default borrowRouter;