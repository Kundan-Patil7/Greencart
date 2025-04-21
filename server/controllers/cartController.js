



// Update User crtData :  /api/cart/update

import User from "../models/user.js"

export const updatecart = async (req,res) =>{
try {
    const {userId, cartItems}=req.body

    await User.findByIdAndUpdate(userId,[cartItems])

    res.json({ success: true, message: "Cart updated" });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}

}


