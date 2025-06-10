import { token } from "morgan";
import userModel from "../models/userModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";
export const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      password,
      address,
      city,
      country,
      phone,
      answer,
    } = req.body;
    //validation
    if (
      !name ||
      !email ||
      !role ||
      !password
      // !address ||
      // !city ||
      // !country ||
      // !phone || !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }
    //check exisiting user
    const exisitingUser = await userModel.findOne({ email });
    //validation
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already taken",
      });
    }
    const user = await userModel.create({
      name,
      email,
      role,
      password,
      // address,
      // city,
      // country,
      // phone,
      // answer
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Registeration Success, Please Login",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};
//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please add Email or Password",
      });
    }
    //Check User
    const user = await userModel.findOne({ email });
    //user validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    //check password
    const isMatch = await user.comparePassword(password);
    //validation
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token//////////
    const token = user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Api",
      error,
    });
  }
};

//GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    //to hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Profile fatched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Profile Api",
      error,
    });
  }
};

//logout
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // true in production
        sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax", // none for cross-origin, lax for dev
      })
      .send({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Logout Api",
      error,
    });
  }
};


//update profile
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    //validation + updates
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

//update profile user password
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //validation + updates
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide old or new password",
      });
    }
    //old password check
    const isMatch = await user.comparePassword(oldPassword);

    //validation
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid old password",
      });
    }
    user.password = newPassword;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

// FORGOT PASSWORD
export const passwordResetController = async (req, res) => {
  try {
    // user get email || newPassword || answer
    const { email, newPassword, answer } = req.body;
    // valdiation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // find user
    const user = await userModel.findOne({ email, answer });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid user or answer",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Your Password Has Been Reset Please Login !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In password reset API",
      error,
    });
  }
};

/// Update user profile photo
export const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No image uploaded",
      });
    }
    // file get from client photo
    const file = getDataUri(req.file);
    // // delete prev image


    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id); //works when pro. pic already set. unable to work in first time for first time we need to coment it out
    // // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // // update

    if (user.profilePic && user.profilePic.public_id) {
  await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
}

    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save func
    await user.save();

    res.status(200).send({
      success: true,
      message: "profile picture updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update profile pic API",
      error,
    });
  }
};

// Get User Controller
export const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Avoid sending passwords
    res.status(200).json(
      { 
        success: true, 
        users 
      }
    );
  } catch (error) {
    res.status(500).json(
      { 
        success: false, 
        message: "Server Error", 
        error 
      }
    );
  }
};

// DELETE USER CONTROLLER
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Delete profile picture from cloudinary if exists
    if (user.profilePic && user.profilePic.public_id) {
      await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    }

    // Delete user from DB
    await userModel.findByIdAndDelete(userId);

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting user",
      error,
    });
  }
};

export const getSingleUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password"); // hide password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: err.message,
    });
  }
};


