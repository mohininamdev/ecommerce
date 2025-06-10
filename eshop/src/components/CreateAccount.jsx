import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import FacebookIcon from "../assets/facebook-icon.png"
import GoogleIcon from "../assets/google-icon.png"

import {registerUser} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from 'sonner';

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const resultAction = await dispatch(registerUser({ name, email, password, role }));

  if (registerUser.fulfilled.match(resultAction)) {
    toast.success("Account created successfully!");

    const userRole = resultAction.payload?.role?.toLowerCase();

    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/"); 
    }
  } else {
    const errorMessage = resultAction.payload?.message || "Registration failed";
    toast.error(errorMessage);
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-center text-sm mb-4">
          Have an Account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 "
              />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 "
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Role</label>
              <input
                type="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Admin/user"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 "
              />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
          >
            Create Account
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            By creating account, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
          </p>
        </form>

        <div className="my-4 border-t" />

        <p className="text-center text-sm text-gray-500 mb-4">
          Or create an account using:
        </p>

        <div className="space-y-2">
          <button
            className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100"
          >
            <img
              src={GoogleIcon}
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100"
          >
            <img
              src={FacebookIcon}
              alt="Facebook"
              className="w-6 h-6 mr-2"
            />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
