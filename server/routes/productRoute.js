import express from 'express';
import upload from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, ProductList, productById } from '../controllers/ProductController.js';

const productRouter = express.Router();

// Add product
productRouter.post("/add", upload.array("images", 5), addProduct);


// Get all products
productRouter.get('/list', ProductList);

// Get a single product by ID
productRouter.get('/id', productById);

// Update product stock
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
