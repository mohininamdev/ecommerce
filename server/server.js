import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
// import helmet from "helmet"
// import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";

//dot env config (it should be on top just aster all imports otherwise it does't worrk)
dotenv.config();

//DB connnection function call
connectDB();

//stripe configuration
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

//cloudinary  config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// rest object
const app = express();

//middlewares
// app.use(helmet());
// app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    // origin: process.env.FRONTEND_URL, // allow CRA frontend
    origin: process.env.FRONTEND_URL,
    credentials: true, // if you're using cookies/auth
  })
);
//---cookie parser
app.use(cookieParser());

//....route (we need to follow any desig pattern so we will work on MVC design pattern to make app more scalable)
//... app.get('/test') http://http://localhost:3000/test
//routes import
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/contactUs", contactUsRoutes);
app.use("/api/v1", homeRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cat", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
// Admin "email":"a@a.com",
// "password":"123456",

//port
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Node Server app</h1>");
});

//listen
app.listen(PORT, () => {
  console.log(
    `Server running on PORT http://localhost:${process.env.PORT} on ${process.env.NODE_ENV}`
      .bgMagenta.white
  );
});
