import express from "express"
import authUser from "../middleware/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCod } from "../controllers/orderController.js";
import authSeller from "../middleware/authSeller.js";
const OrderRouter = express.Router();

OrderRouter.post("/cod", authUser, placeOrderCod)
OrderRouter.get("/user", authUser, getUserOrders)
OrderRouter.get("/seller", authSeller, getAllOrders)


export default OrderRouter