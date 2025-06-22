import { model, Schema } from "mongoose";
import IBorrow from "../interfaces/borrowInterface";

const borrowSchema = new Schema<IBorrow>({
   book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
   },
   quantity: {
      type: Number,
      required: true,
      min: 1
   },
   dueDate: {
      type: Date,
      required: true
   },
   
}, { timestamps: true })

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;