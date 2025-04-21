// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: Array, required: true,  },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: Array, required: true },
//     inStock: { type: Boolean, default: true },
//   },
//   { timestamps:true }  
// );

// // Check if the model exists before defining it
// const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// export default Product;


import mongoose from "mongoose";

// Define the schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: [String], required: true }, 
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: [String], required: true }, 
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }  
);

// Use mongoose.model or fallback to existing
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
