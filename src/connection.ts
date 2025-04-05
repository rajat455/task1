import mongoose from "mongoose";

export default async function ConnectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI  || "mongodb://host.docker.internal:27017/task1")
        console.log("Db Connected")
    } catch (error) {
        console.log(error)
        console.log("Db Connection Loss")
    }
}