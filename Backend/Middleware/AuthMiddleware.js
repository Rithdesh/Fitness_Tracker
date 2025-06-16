const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ message: "Token required" });
      }
      
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded; // { id: user._id, name: user.name, email: user.email }
      next();
    } catch (error) {
      console.error("JWT error:", error.message);
      res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
  };

  module.exports = authenticateJWT;