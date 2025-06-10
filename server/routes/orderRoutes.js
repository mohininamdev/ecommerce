import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  changeOrderStatusController,
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getMyOrdersCotroller,
  singleOrderDetrailsController,
  cancelOrderByUser,
  paymentsController
} from "../controllers/orderController.js";

const router = express.Router();

//rroutes
// ============== ORDERS ROUTES ==================

// CREATE ORDERS
router.post("/create", isAuth, createOrderController);

//  GET ALL ORDERS
router.get("/my-orders", isAuth, getMyOrdersCotroller);

//  GET SINGLE ORDER DETAILS
router.get("/my-orders/:id", isAuth, singleOrderDetrailsController);

router.put("/cancel/:id", isAuth, deleteOrderController);


// recceipt payments
router.post("/payments", isAuth, paymentsController);

/// ======== ADMIN PART ============
// get all order
router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

// change order status
router.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);

router.delete("/delete/:id", isAuth, isAdmin, cancelOrderByUser);
// =======

export default router;
