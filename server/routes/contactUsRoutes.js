import express from "express";
import {
  submitContactUsMessage,
  getAllContcatUsMessages,
} from "../controllers/contactUsController.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user/form",  submitContactUsMessage); // Anyone can submit
router.get("/admin/formData", isAuth, isAdmin, getAllContcatUsMessages); // Admin only

export default router;
