import mongoose from "mongoose";
//REVIEW MODEL SCHEMA
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user require"],
    },
  },
  { timestamps: true }
);

//PRODUCT MODEL SCHEMA
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default:0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
    },
    material: {
      type: String,
    },
    size: {
      type: [String],
    },
    colors: {
      type: [String],
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    weight: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["men", "women", "other"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags:[String],
    
  },
  { timestamps: true }
);
export const productModel = mongoose.model("Products", productSchema);
export default productModel;
