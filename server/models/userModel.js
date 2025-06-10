import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"],
      match:[/.+\@.+\..+/,"Please Enter a valid Email Address"]
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "password length should be greater than 6 character"],
    },
    role: {
      type: String,
      enum:["user","admin"],
      default: "user",
    },
    address: {
      type: String,
      // required: [true, "Address is required"],
    },
    city: {
      type: String,
      // required: [true, "City name is required"],
    },
    country: {
      type: String,
      // required: [true, "Country name is required"],
    },
    phone: {
      type: String,
      // required: [true, "Phone Number is required"],
    },
    profilePic: {
      public_id:{
        type:String,
      },
      url:{
        type:String,
      }
    },
    answer:{
      type:String,
      // required: [true,"answer is required"]
    },
   
  },
  { timestamps: true }
);
//functions
//Hash Function
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//compare funtion
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//JWT TOKEN
userSchema.methods.generateToken = function () {
  //token create
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const userModel = mongoose.model("Users", userSchema);
export default userModel;
