// Creating connection with mongodb database here.
import mongoose from 'mongoose';
const url = process.env.MONGODB_URL || "mongodb://0.0.0.0:27017/hospitalDB";
export const connectUsingMongoose = async()=>{
    try {
      await mongoose.connect(url);
      console.log("Mongodb connected using mongoose.");
    } catch (error) {
        console.log("Error while connecting to db");
        console.log(error);
    }
}