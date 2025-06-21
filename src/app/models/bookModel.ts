import { model, Schema } from "mongoose";


const bookSchema = new Schema<IBook>({
   title: {
      type: String,
      required: true,
      trim: true
   },
   author: {
      type: String,
      required: true,
      trim: true
   },
   genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
   },
   isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   description: {
      type: String,
      trim: true
   },
   copies: {
      type: Number,
      required: true,
      min: 0,
   },
   available: {
      type: Boolean,
      default: true,
   }
}, { timestamps: true })

const Book = model<IBook>('Book', bookSchema);
export default Book;