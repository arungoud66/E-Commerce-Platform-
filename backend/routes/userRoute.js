import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/AuthMiddleware.js";
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    // registration logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already existed" });
    user = new User({ name, email, password });
    await user.save();

    // create JWT payload using User info
    const payload = { user: { id: user._id, role: user.role } };
    // sign and return the token along with the user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (error, token) => {
        if (error) throw error;

        // send the user and token in response
        // 201 Created
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/user/login
// @desc Authenticate user
// @access public
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Cannot find this user to login" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (error, token) => {
        if (error) throw error;

        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});


// @route GET /api/user/profile
// @access Private
userRouter.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

export default userRouter;
