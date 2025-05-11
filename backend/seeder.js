
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import products from "./data/product.js";
import Cart from "./models/Cart.js";

dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {});

// function to seed data
const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    // Assign the created user's ID to the product data
    const user = createdUser._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user,
    }));

    // insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
