import express from "express"
import { updatecart } from "../controllers/cartController.js"
import authUser from "../middleware/authUser.js"

const cartRouter = express.Router()


cartRouter.post('/update', authUser, updatecart) 
export  default cartRouter;