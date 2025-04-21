import jwt from "jsonwebtoken";

// Login seller : /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!process.env.SELLER_EMAIL || !process.env.SELLER_PASSWORD) {
      console.error("Environment variables SELLER_EMAIL and SELLER_PASSWORD are not set.");
      return res.status(500).json({
        success: false,
        message: "Configuration error",
      });
    }

    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ success: true, message: "Logged in successfully" });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// seller isAuth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      return res.json({ success: true, email: decoded.email });
    });
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// logout Seller : /api/seller/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


