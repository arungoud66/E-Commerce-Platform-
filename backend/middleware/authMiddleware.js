
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select("-password"); //exclude password
      next();
    } catch (error) {
      console.log("token verification failed", error);
      res.status(401).json({ message: "Not authorized, token failed! " });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};
export { protect, admin };
