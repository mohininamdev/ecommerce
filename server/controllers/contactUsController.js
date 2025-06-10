import contactUsModel from "../models/contactUsModel.js";

// POST /api/contact
export const submitContactUsMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = req.user || null;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = await contactUsModel.create({
      name,
      email,
      message,
      user: user ? user._id : null,
    });
    await newMessage.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Message sent successfully.",
        newMessage,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In contactUs API",
    });
  }
};
// GET /api/contact (Admin only)
export const getAllContcatUsMessages = async (req, res) => {
  try {
    const messages = await contactUsModel
      .find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    console.error("Fetch contact messages error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contact messages",
      error,
    });
  }
};
