import express from "express";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { homeController } from "../controllers/homeController.js";

//router object
const router = express.Router();

//Home route for user 
router.get("/user/home", homeController);
router.get("/home/user", isAuth, homeController);
router.get("/admin/dashboard", isAuth, isAdmin, homeController);



//export
export default router;
