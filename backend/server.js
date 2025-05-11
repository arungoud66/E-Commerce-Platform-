import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import checkoutRoutes from "./routes/checkoutRoute.js";
import orderRouter from "./routes/orderRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import subscribersRouter from "./routes/subscriberRoute.js";
import adminRouter from "./routes/adminRoute.js";
import productsAdminRouter from "./routes/productsAdminRoute.js";
import adminOrderRouter from "./routes/adminOrderRoute.js";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subscribersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/products", productsAdminRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
