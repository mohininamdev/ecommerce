import express from "express";
import { getUserProfileController, loginController, logoutController, registerController, updateProfileController, updatePasswordController, passwordResetController } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import {rateLimit} from 'express-rate-limit'

// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

//router object
const router = express.Router();
//router
router.post("/register", limiter, registerController);
// Admin login ps
// "email":"n@n.com",
// "password":"123456",

//login
router.post("/login", limiter, loginController);

//profile
router.get('/profile', isAuth, getUserProfileController);

//logout
router.get('/logout', isAuth, logoutController);

//update profile
router.put('/updateProfile', isAuth, updateProfileController);

//update password
router.put('/updatePassword', isAuth, updatePasswordController);

// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);


//export
export default router;
