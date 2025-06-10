// export const homeController = (req, res) => {
//   res.status(200).send({
//     message: 'Home Routes',
//     success: true,
//   });
// };

import productModel from "../models/productModel.js"
export const homeController = (req, res) => {
  try {
    const  user  = req.user; // Should be set by auth middleware

    // Case 1: No user (unauthenticated)
    if (!user) {
      return res.status(200).send({
        message: 'Welcome to the Home Page - Guest Access',
        success: true,
      });
    }
    const role = user.role;

    // Case 2: User is admin
    if (role === 'admin') {
      return res.status(200).send({
        message: 'Welcome to the Admin Dashboard',
        success: true,
      });
    }

    // Case 3: Normal user
    if (role === 'user') {
      return res.status(200).send({
        message: 'Welcome to the Home Page - User Access',
        success: true,
      });
    }

    // Case 4: Invalid role or impersonation
    return res.status(401).send({
      message: 'Invalid Credentials - Access Denied',
      success: false,
    });

  } catch (error) {
    return res.status(500).send({
      message: 'Server Error',
      success: false,
      error: error.message,
    });
  }
};



