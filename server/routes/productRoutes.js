import express from "express";
import {isAdmin, isAuth} from "./../middlewares/authMiddleware.js"
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, productReviewController, updateProductController } from "../controllers/productController.js";

const router = express.Router();

//routes
//Get all products
router.get("/get-all", getAllProductsController);

//Get single product
router.get("/:id", getSingleProductController);

//Create product
router.post("/create", isAuth, isAdmin, createProductController);

// UPDATE PRODUCT
router.put("/:id", isAuth, isAdmin, updateProductController);

// delete product
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);

export default router;


