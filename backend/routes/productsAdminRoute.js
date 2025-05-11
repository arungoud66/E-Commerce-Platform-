
import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import Product from "../models/Product.js";

const productsAdminRoute = express.Router();

//@ routes GET /api/admin/products
//@desc Get all products(only for admin)
//@access Private/Admin
productsAdminRoute.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    let products = await Product.find({});
    res.status(200).json(products);
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default productsAdminRoute;
