import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";


//   const { keyword, category } = req.query;
//   try {
//     const products = await productModel
//       .find({
//         name: {
//           $regex: keyword ? keyword : "",
//           $options: "i",
//         },
//          category: category ? category : null,
//       })
//       .populate("category");
//   

// GET ALL PRODUCTS
export const getAllProductsController = async (req, res) => {
  const { keyword, category } = req.query;
  
  try {
    const filter = {
      name: {
        $regex: keyword || "",
        $options: "i",
      },      
    };

    if (category) {
      filter.category = category; // Only add this if category is specified
    }

    const products = await productModel.find(filter).populate("category");
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Products API",
      error,
    });
  }
};


// GET TOP PRODUCT
export const getFeatureProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).send({
      success: true,
      message: "top 4 products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get TOP PRODUCTS API",
      error,
    });
  }
};

//get Latest Products controller 
export const getLatestProductsController = async (req, res) => {
  try {
    const products = await productModel.find({})
      .sort({ createdAt: -1 }) // sort by newest
      .limit(4);

    res.status(200).send({
      success: true,
      message: "Latest 4 products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Latest Products API",
      error,
    });
  }
};


// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    // get product id
    const product = await productModel.findById(req.params.id);
    //valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Found",
      product,
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
      message: "Error In Get single Products API",
      error,
    });
  }
};

// CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    // validtion
    if (!name || !description || !price || !category || !stock ) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "please provide product images",
      });
    }

    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).send({
        success: false,
        message: "Price and Stock must be valid numbers",
      });
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      images: [image],
    });
    // await categoryModel.findOneAndUpdate(
    //   { category: category },
    //   { $inc: { productCount: 1 } }
    // );

    res.status(201).send({
      success: true,
      message: "product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In create Products API",
      error,
    });
  }
};

// UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    //valdiatiuon
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    const { name, description, price, stock, category } = req.body;
    // validate and update
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();
    res.status(200).send({
      success: true,
      message: "product details updated",
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
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// UPDATE PRODUCT IMAGE
export const updateProductImageController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    // valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    // check file
    if (!req.file) {
      return res.status(404).send({
        success: false,
        message: "Product image not found",
      });
    }

    const file = getDataUri(req.file);
    
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save
    product.images.push(image);

    await product.save();
    res.status(200).send({
      success: true,
      message: "product image updated",
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
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// DELETE PROEDUCT IMAGE
export const deleteProductImageController = async (req, res) => {
  try {
    // find produtc
    const product = await productModel.findById(req.params.id);
    // validatin
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }

    // image id find
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "product image not found",
      });
    }

    let isExist = -1;
    product.images.forEach((item, index) => {
      if (item._id.toString() === id.toString()) isExist = index;
    });
    if (isExist < 0) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }
    // DELETE PRODUCT IMAGE
    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist, 1);
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Product Image Dleteed Successfully",
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
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
};

// DLEETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }

    // find and delete image cloudinary
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }

    await product.deleteOne();

    if (product) {
      await categoryModel.findOneAndUpdate(
        { category: product.category },
        { $inc: { productCount: -1 } }
      );
    }
    res.status(200).send({
      success: true,
      message: "PRoduct Deleted Successfully",
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
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
};

// CREATE PRODUCT REVIEW AND COMMENT
export const productReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    if (!comment || !rating) {
      return res.status(400).send({
        success: false,
        message: "Please provide comment and rating",
      });
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).send({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      // Update review if user already reviewed
      alreadyReviewed.comment = comment;
      alreadyReviewed.rating = numericRating;
    } else {
      // Add new review
      product.reviews.push({
        name: req.user.name,
        rating: numericRating,
        comment,
        user: req.user._id,
      });
      product.numReviews = product.reviews.length;
    }

    // Recalculate average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).send({
      success: true,
      message: "Review Added/Updated!",
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error in review comment API",
      error,
    });
  }
};


// ========== PRODUCT CTRL ENDS ================