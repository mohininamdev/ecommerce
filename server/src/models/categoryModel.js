import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      unique: true, 
    },
    productCount: {
      type: Number, 
      default: 0 },
  },
  { timestamps: true }
);
export const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
