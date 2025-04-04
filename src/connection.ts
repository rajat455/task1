import mongoose from "mongoose";

export default async function ConnectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/task1")
        console.log("Db Connected")
    } catch (error) {
        console.log("Db Connection Loss")
    }
}