import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
dotenv.config()
const MongoURL: string = process.env.MONGO_URI!
const ConnectDB = async ():Promise<void>=>{
   try {
     await mongoose.connect(MongoURL)
    console.log("Connected Successfully")
   } catch (error) {
     const err = error as Error
     console.log("X Connection Failed",err.message)
     process.exit(1)
   }
}
export default ConnectDB
