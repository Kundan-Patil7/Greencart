import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Await the connection and log when connected successfully
    await mongoose.connect(`${process.env.MONGODB_URI}greencart`);

    console.log("Database Connected");
  } catch (error) {
    // Log the error message if connection fails
    console.error("Database connection failed:", error.message);
  }
};

export default connectDB;
