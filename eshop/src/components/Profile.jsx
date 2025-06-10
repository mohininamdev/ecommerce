import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  updateProfilePicture,
} from "../redux/slices/authSlice"; // adjust path
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";
import { Pencil,  Upload } from "lucide-react";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Profile Pic
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  //.....................................

  const { user, loading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);
    dispatch(updateProfilePicture(selectedFile))
      .unwrap()
      .then((msg) => {
        setMessage(msg);
        setShowUpload(false); // <-- hide upload options
        setPreview(null); // optional: clear preview
        setSelectedFile(null); // optional: reset file
      })
      .catch((err) => setMessage(err))
      .finally(() => setUploading(false));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Clean the data before sending
    const updatedData = {
      name: formData.name,
      email: formData.email,
    };
    if (formData.phone) updatedData.phone = formData.phone;
    if (formData.address) updatedData.address = formData.address;

    dispatch(updateUserProfile(updatedData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <div className="flex flex-col mt-14 relative">
      <div className="flex md:flex-row flex-col items-start">
        <div className="md:flex flex-col w-24">
          <div
            className="py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer bg-red-700 hover:bg-red-600 text-white"
            onClick={() => navigate("/order")}
          >
            ORDER
          </div>
          <div
            className="mb-8 py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer bg-red-700 hover:bg-red-600 text-white"
            onClick={() => navigate("/profile")}
          >
            PROFILE
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-center flex-col md:flex-row">
            <div className="px-4">
              <h2 className="text-2xl font-bold">PROFILE</h2>
              <div className="w-14 h-1 bg-red-800 mb-6"></div>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : user ? (
                <form className="space-y-6 max-w-sm">
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Password</label>
                    <input
                      type="password"
                      value="********"
                      readOnly
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 cursor-not-allowed"
                    />
                    
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">ID</label>
                    <input
                      type="text"
                      value={user._id}
                      readOnly
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Phone No.</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 text-red-800 font-bold"
                      placeholder="Not provided"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100"
                    />
                  </div>
                  <div className="flex items-start space-x-4">
                    <label className="w-24 font-medium pt-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 h-20"
                      placeholder="Not provided"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                    {isEditing && (
                      <button
                        type="submit"
                        onClick={handleSave}
                        className="border hover:bg-red-800 border-red-800 text-red-700 py-2 px-3 rounded-full"
                      >
                        Save Profile
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => navigate("/updatePassword")}
                      className="border hover:bg-red-800 border-red-800 text-red-700 py-2 px-3 rounded-full"
                    >
                      Change Password
                    </button>
                    {/* <button className="border hover:bg-red-800 border-red-800 text-red-700 py-2 px-3 rounded-full">
                      Log Out
                    </button> */}
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="border hover:bg-red-800 border-red-800 text-red-700 py-2 px-3 rounded-full"
                    >
                      Update
                    </button>
                  </div>
                </form>
              ) : null}
            </div>

            <div className="mt-6 md:mt-4 md:ml-10 px-4">
              <Pencil
                size={18}
                onClick={() => setShowUpload((prev) => !prev)}
                className="hover:text-red-800 flex text-gray-600 cursor-pointer mb-2"
              />

              <div className="mt-6">
                {preview || user?.profilePic?.url ? (
                  <img
                    src={preview || user.profilePic.url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-red-600 shadow-lg"
                  />
                ) : (
                  <div>
                    <p className="text-gray-500">No profile picture uploaded</p>
                  </div>
                )}
                {showUpload && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Update Profile Picture
                    </h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {/* {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-24 h-24 mt-2 rounded-full object-cover"
                    />
                  )} */}

                    <div className="relative group">
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="mt-2 p-2 bg-red-700 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {uploading ? "Uploading..." : "Upload"}
                      </span>
                    </div>
                    {message && (
                      <p className="mt-2 text-sm text-green-600">{message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:space-y-8">
        <Footer />
      </div>
    </div>
  );
}
