import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './app/config/db';
import bookRouter from './app/routes/bookRoute';
import borrowRouter from './app/routes/borrowRoute';

const app = express();

const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());


//application routes

app.use('/api/books', bookRouter)
app.use('/api/borrow', borrowRouter)



//main routes
app.get('/', (req: Request, res: Response) => {
   res.send("Server is running on port: ")
})


app.listen(port, () => {
   console.log("Server is running on prot : ", port);
})