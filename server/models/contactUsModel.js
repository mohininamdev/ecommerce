import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"] 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"] 
    },
    message: { 
      type: String, 
      required: [true, "Message is required"] 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Users", 
      default: null 
    },

  },
  { timestamps: true }
);

const ContactUsModel = mongoose.model("ContactUsMessage", contactUsSchema);
export default ContactUsModel;
