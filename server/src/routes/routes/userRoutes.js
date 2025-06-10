import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  updateProfileController,
  updatePasswordController,
  passwordResetController,
  updateProfilePicController,
  getAllUserController,
  deleteUserController,
  getSingleUserById
} from "../controllers/userController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { rateLimit } from "express-rate-limit";
import { singleUpload } from "../middlewares/multer.js";

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
//login
router.post("/login", limiter, loginController);

//profile
router.get("/profile", isAuth, getUserProfileController);

//logout
router.post("/logout", isAuth, logoutController);

//update profile
router.put("/updateProfile", isAuth, updateProfileController);

//update password
router.put("/updatePassword", isAuth, updatePasswordController);

// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

//upload profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);


////////////ADMIN
//get all user 
router.get("/get-all", isAuth, isAdmin, getAllUserController,)

//delete user from fronend
router.delete("/delete/:id", isAuth, isAdmin, deleteUserController );

//get user by ID
router.get("/detail/:id", isAuth, isAdmin, getSingleUserById);

//export
export default router;
