import jwt from "jsonwebtoken"; // Import JWT for token verification
import User from "../models/user.js"; // Import the User model for database operations
import dotenv from "dotenv";
dotenv.config();

// // Middleware to authenticate the user

const authUser = async (req, res, next) => {
  const { token } = req.cookies; // Extract token from cookies

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized", // Token missing
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id; // Attach userId to the request body
    } else {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.json({
      success: false,
      message: error.message, // Handle token verification errors
    });
  }
};

export default authUser;

// const authUser = async (req, res, next) => {
//   console.log("Cookies:", req.cookies); // Log cookies to check if token is present

//   const { token } = req.cookies;
//   if (!token) {
//     console.log("No token found");
//     return res.status(401).json({ success: false, message: "Not Authorized" });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", tokenDecode); // Log decoded token

//     if (tokenDecode.id) {
//       req.body.userId = tokenDecode.id;
//       console.log("User authenticated with ID:", tokenDecode.id);
//       next(); // Proceed to next middleware
//     } else {
//       console.log("Token does not contain an ID");
//       return res.status(401).json({ success: false, message: "Not Authorized" });
//     }
//   } catch (error) {
//     console.error("Token verification error:", error.message); // Log error details
//     return res.status(401).json({ success: false, message: error.message });
//   }
// };

// export default authUser;
