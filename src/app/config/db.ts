import mongoose from "mongoose"


const connectDB = async() =>{
   try {
      await mongoose.connect(process.env.MONGODB_URI!)
      console.log('Database Connected✅');
      
   } catch (error) {
      console.log("Connection Failed!")      
   }
}

export default connectDB;