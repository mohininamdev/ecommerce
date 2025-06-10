import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(formData));
  };

  // ✅ Redirect after success
  useEffect(() => {
    if (message === "User Password Updated Successfully") {
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 1500); // 1.5s delay to show success message
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
          Update Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {message && <p className="text-green-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
