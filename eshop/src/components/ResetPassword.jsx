import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    // Proceed with form submission (e.g., call API)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Password Reset</h2>
        <p className="text-center text-gray-500  text-sm mb-4">
          We Will Help You Reset your Password          
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-900 text-white py-2 rounded font-medium"
          ><Link to="/confirmemail" className="hover:underline">Reset Password</Link>
            
          </button>
          <div className="my-4 border-t"/>
          <p className="text-center text-xs text-gray-500 mt-2">
            Rememberred your Password?
            
          </p>
          
          <button
            type="button"
            className="w-full hover:bg-red-800 border rounded px-3 py-2 text-sm outline-none focus:ring-2 font-medium"
          >
            <Link to="/login" className="text-blue-600 hover:underline">
            Back to Sign In
            </Link>
            
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword