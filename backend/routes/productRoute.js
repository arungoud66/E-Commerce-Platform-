
import express from "express";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/AuthMiddleware.js";

const productRouter = express.Router();

// @routes POST /api/products
// @desc Create new product in database
// @access Private/Admin
productRouter.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //refer to current  admin user
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routes GET /api/products/best-seller
// @desc Retrieve best-selling products
// @access Public
productRouter.get("/best-seller", async (req, res) => {
  try {
    const bestSellingProducts = await Product.find({})
      .sort({ rating: -1 })
      .limit(1);
    if (bestSellingProducts) {
      res.json(bestSellingProducts);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routes GET /api/products/new-arrivals
// @desc Retrieve new arrivals products
// @access Public
productRouter.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routes PUT /api/products/:id
// @desc Update a product
// @access Private/Admin
productRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    // find product by id
    const product = await Product.findById(req.params.id);
    if (product) {
      // update product
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      // save product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routs DELETE /api/products/:id
// @desc Delete a product
// @access Private/Admin
productRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routs GET /api/products
// @desc Get all product
// @access Public
productRouter.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = {
        //  query.material = { $in: ["cotton", "polyester"] }
        $in: material.split(","),
      };
    }

    if (brand) {
      query.brand = {
        $in: brand.split(","),
      };
    }
    if (size) {
      query.sizes = {
        $in: size.split(","),
      };
    }
    if (color) {
      query.colors = {
        $in: [color],
      };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        // greater than or equal to minPrice
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        // less than or equal to maxPrice
        query.price.$lte = Number(maxPrice);
      }
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        
        case "priceAsc":
          sort = { price: 1 };
          break;
        
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          // query.sort({ createdAt: -1 });
          break;
      }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // fetch products from DB
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @routes GET /api/products/similar/:id
// @desc Retrieve similar products for a given product id
// @access Public
productRouter.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// #@routes GET /api/products/:id
// #@desc Get a single product by id
// #@access Public
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default productRouter;
