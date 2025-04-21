import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies; // Extract token from cookies

  if (!sellerToken) {
    return res.json({
      success: false,
      message: "Not authorized", // Token is missing
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET); // Verify the token

    // Check if the decoded email matches the authorized seller email
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next(); // Proceed to the next middleware
    } else {
      return res.json({
        success: false,
        message: "Not authorized", // Email does not match
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message, // Token verification error
    });
  }
};

export default authSeller;
