import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { stripe } from "../server.js";




// CREATE ORDERS
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;
    //valdiation
    // create order
    await orderModel.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });

    // stock update
    for (let i = 0; i < orderItems.length; i++) {
      // find product
      const product = await productModel.findById(orderItems[i].product);
      if (!product) {
    return res.status(404).send({
      success: false,
      message: `Product not found with ID: ${orderItems[i].product}`,
    });
  }
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Order API",
      error: error.message || "Unknown error",
    });
  }
};




// GET ALL ORDERS - MY ORDERS
export const getMyOrdersCotroller = async (req, res) => {
  try {
    // find orders
    const orders = await orderModel.find({ user: req.user._id });
    //valdiation
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "no orders found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your orders data",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In My orders Order API",
      error,
    });
  }
};

// GET SINGLE ORDER INFO
export const singleOrderDetrailsController = async (req, res) => {
  try {
    // find orders
    const order = await orderModel.findById(req.params.id);
    //valdiation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "no order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your order fetched",
      order,
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

// ACCEPT PAYMENTS
export const paymentsController = async (req, res) => {
  try {
    // get ampunt
    const { totalAmount, description, customerName, customerAddress } = req.body;
    // validation
    if (!totalAmount || !customerName || !customerAddress) {
      return res.status(400).send({
        success: false,
        message: "Missing required payment information",
      });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100),
      currency: "inr",
      description,
      shipping: {
        name: customerName,
        address: {
          line1: customerAddress.line1,
          line2: customerAddress.line2 || "",
          city: customerAddress.city,
          state: customerAddress.state,
          postal_code: customerAddress.postal_code,
          country: customerAddress.country, // e.g., "IN"
        },
      },
      metadata: {
        integration_check: "accept_a_payment",
      },
    });
    res.status(200).send({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Payment Error =>", error);
    res.status(500).send({
      success: false,
      message: "Error In Get order Payments API",
      error: error.message,
    });
  }
};


// ==== ADMIN SECTION ====

// GET ALL ORDERS
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("user", "name email"); 
    // const orders = await orderModel.find({});
    res.status(200).send({
      success: true,
      message: "All Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const changeOrderStatusController = async (req, res) => {
  try {
    // find order
    const order = await orderModel.findById(req.params.id);
    // validatiom
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    if (order.orderStatus === "processing") order.orderStatus = "shipped";
    else if (order.orderStatus === "shipped") {
      order.orderStatus = "deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "order already deliverd",
      });
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "order status updated",
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

export const deleteOrderController = async (req, res) => {
  try {
    // find product
    const order = await orderModel.findById(req.params.id);
    // validation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    await order.deleteOne();
    res.status(200).send({
      success: true,
      message: "Order removed Successfully",
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
      message: "Error In Get DELETE order API",
      error,
    });
  }
};

export const cancelOrderByUser = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ 
         success: false,
        message: "Order not found" 
      });
    }
    order.orderStatus = "cancelled_by_user"; // Corrected field name
    await order.save();
    res.status(200).send({
      success: true,
      message: "Order removed Successfully",
    });
    // Update the status

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
