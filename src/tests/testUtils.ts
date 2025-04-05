import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/task1");
};

export const closeDB = async () => {
  await mongoose.connection.close();
};

