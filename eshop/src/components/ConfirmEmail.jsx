import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmEmail = () => {
    
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
            <h2 className="text-2xl font-bold text-center mb-2">Confirm Email</h2>
            <p className="text-center text-gray-500  text-sm mb-4">
              Your Email and Enter Confirmation Code          
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium block mb-1">Confirmation Code</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Code"
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
                className="w-full bg-red-800 hover:bg-red-900 py-2 rounded font-medium"
              >
                <Link to="/almostdone" className="w-full  text-white">
                Confirm Email
                </Link>
                
              </button>
              <div className="my-4 border-t"/>
              <p className="text-center text-xs text-gray-500 mt-2">
                Haven't received you code?
                
              </p>

              <div className="my-4 border-t"/>
                <p className="text-center text-xs text-gray-500 mt-2">
                    Rememberred your Password?
                    
                </p>
              <button
                type="button"
                className="w-full text-blue-600 hover:underline border rounded px-3 py-2 text-sm outline-none focus:ring-2 font-medium"
              >
                Resend Code
 
              </button>
            </form>
          </div>
        </div>
  )
}

export default ConfirmEmail