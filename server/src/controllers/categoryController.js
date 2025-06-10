import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

// CREAT CAT
export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "please provide category name",
      });
    }
    const exists = await categoryModel.findOne({ category });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const newCat = await categoryModel.create({ category });
    res.status(201).send({
      success: true,
      message: `${category} category creted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
    });
  }
};

// GET ALL CAT
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await productModel.countDocuments({ category: cat._id });
        return {
          _id: cat._id,
          category: cat.category,
          productCount: count,
        };
      })
    );

    res.status(200).send({
      success: true,
      message: "Categories Fetch Successfully",
      totalCat: categories.length,
      categories: categoriesWithCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Cat API",
    });
  }
};

// DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
  try {
    // find category
    const category = await categoryModel.findById(req.params.id);
    //validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    // find product with this category id
    const products = await productModel.find({ category: category._id });
    // update producty category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = undefined;
      await product.save();
    }
    // save
    await category.deleteOne();
    res.status(200).send({
      success: true,
      message: "Catgeory Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In DELETE CAT API",
      error,
    });
  }
};

// UDPATE CAT
// PUT /api/v1/category/:id

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params; // category document _id
    const { category } = req.body; // new category name

    const existing = await categoryModel.findOne({ category });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { category },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
