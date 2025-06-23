
import imagekit from "../configs/imagekit.js";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    // Parse product data
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    console.log("Received files:", req.files  , productData);


    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded. Please upload at least one image.",
      });
    }

    // Upload images to ImageKit
    const imageUrls = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await imagekit.upload({
            file: item.path,
            fileName: item.originalname, // Original name of the file
            folder: "products", // Folder in ImageKit
          });
          return result.url; // Return the URL of the uploaded image
        } catch (uploadError) {
          console.error("Detailed ImageKit Upload Error:", uploadError);
          throw new Error("Image upload failed.");
        }
      })
    );

    // Create product in the database
    const product = await Product.create({ ...productData, images: imageUrls });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product data. Please check the input.",
        errors: error.errors,
      });
    }

    // Handle generic errors
    res.status(500).json({
      success: false,
      message: "Failed to add product. Please try again.",
    });
  }
};


// Get all products: /api/product/list
export const ProductList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products. Please try again.",
    });
  }
};

// Get single product: /api/product/:id
export const productById = async (req, res) => {
  try {
    const { id } = req.params; // Use req.params for route parameters
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product. Please try again.",
    });
  }
};

// Change product stock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock }
      
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    res.json({
      success: true,
      message: "Stock updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stock. Please try again.",
    });
  }
};
