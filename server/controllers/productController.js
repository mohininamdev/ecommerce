import productModel from "../models/productModel.js";

// //GET All Products without search filter
// export const getAllProductsController = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.status(200).send({
//       success: true,
//       message: "all products fetched successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Get All Products Api",
//       error,
//     });
//   }
// };

// GET ALL PRODUCTS with search filter 
export const getAllProductsController = async (req, res) => {
  const { keyword, category } = req.query;
  try {
    const products = await productModel
      .find({
        name: {
          $regex: keyword ? keyword : "",
          $options: "i",
        },
        // category: category ? category : null,
      })
      .populate("category");
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

//get single product
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
    // // validtion
    if (!name || !description || !price || !stock) {
       return res.status(500).send({
         success: false,
         message: "Please Provide all fields",
       });
     }
    // if (!req.file) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "please provide product images",
    //   });
    // }
    // const file = getDataUri(req.file);
    // const cdb = await cloudinary.v2.uploader.upload(file.content);
    // const image = {
    //   public_id: cdb.public_id,
    //   url: cdb.secure_url,
    // };

    await productModel.create({
      name,
      description,
      price,
      category,
      stock
      // images: [image],
    });

    res.status(201).send({
      success: true,
      message: "product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Products API",
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
    await product.deleteOne();
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
      message: "Error In Get DELETE Product API",
      error,
    });
  }
};

// CREATE PRODUCT REVIEW AND COMMENT
export const productReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const product = await productModel.findById(req.params.id);
    // check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product Alredy Reviewed",
      });
    }
    // review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to reviews array
    product.reviews.push(review);
    // number or reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
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
      message: "Error In Review Comment API",
      error,
    });
  }
};

// ========== PRODUCT CTRL ENDS 