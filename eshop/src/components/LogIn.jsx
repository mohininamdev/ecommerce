import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleIcon from "../assets/google-icon.png";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const role = resultAction.payload?.role?.toLowerCase();
      toast.success("Welcome!");
    

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/"); 
    }
    } else {
      toast.error(resultAction.payload?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-sm mb-4">
          New User?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an Account
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
          >
            Sign In
          </button>
          <p>
            <Link
              to="/resetpassword"
              className="text-blue-600 text-center hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        </form>

        <div className="my-4 border-t" />

        <p className="text-center text-sm text-gray-500 mb-4">
          Or Sign In using:
        </p>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100">
            <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100">
            <img src={FacebookIcon} alt="Facebook" className="w-6 h-6 mr-2" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
