import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import OrderRouter from "./routes/orderRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
await connectDB();


// Define the port
const port = process.env.PORT || 4000;

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);
// Api Routes
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart" , cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order",OrderRouter )


// Routes
app.get("/", (req, res) => {
  res.send("API is working...");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
