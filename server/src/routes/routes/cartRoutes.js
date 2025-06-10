import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart); // Add product to cart
router.get("/:userId", getCart); // Get cart for user
router.put("/update", updateQuantity); // Increase/Decrease quantity
router.delete("/remove", removeFromCart); // Remove item from cart
router.delete("/clear/:userId", clearCart); // Clear whole cart

export default router;
