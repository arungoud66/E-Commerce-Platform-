import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
const cartRouter = express.Router();

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @ routes POST /api/cart
// @ desc add product to cart for guest or logged user
// @ access Public
cartRouter.post("/", async (req, res) => {
  const { productId, quantity, guestId, userId, size, color } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex !== -1) {
        if (productIndex !== -1) {
          console.log("Cart before update:", JSON.stringify(cart.products, null, 2));
          console.log("Matching index found:", productIndex);

          const quantityNumber = Number(quantity);
          if (isNaN(quantityNumber) || quantityNumber <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
          }

          cart.products[productIndex].quantity += quantityNumber;

          console.log("Cart after update:", JSON.stringify(cart.products, null, 2));
          console.log("Matching index found:", productIndex);
        }

      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity,
          size,
          color,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      // create a new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @routes PUT /api/cart
// @desc update cart for guest or logged user
// @access Public
cartRouter.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // update the product quantity
    if (quantity === 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }
    // recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @routes DELETE /api/cart
// @desc delete product from cart for guest or logged user
// @access Public
cartRouter.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products.splice(productIndex, 1);
    // recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @routes GET /api/cart
// @desc get cart for guest or logged user
// @access Public
cartRouter.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  const cart = await getCart(userId, guestId);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.status(200).json(cart);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @routes POST /api/cart/merge
// @desc merge guest cart to logged user cart
// @access Private/logged user
cartRouter.post("/merge", protect, async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized, no user found" });
  }

  const { guestId } = req.body;
  try {
    // Find the guest cart
    let guestCart = await Cart.findOne({ guestId });
    let userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        guestCart.products.forEach((product) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === product.productId.toString() &&
              p.size === product.size &&
              p.color === product.color
          );
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += product.quantity;
          } else {
            userCart.products.push(product);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();
        await Cart.findOneAndDelete({ guestId });
        res.status(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        res.status(200).json(userCart);
      } else {
        res.status(404).json({ message: "Guest cart not found" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default cartRouter;
