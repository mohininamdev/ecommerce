import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetContactState } from "../redux/slices/contactUsSlice";
import Footer from "./Footer";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contactUs);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
     setFormData({ name: "", email: "", message: "" });
        setTimeout(() => dispatch(resetContactState()), 3000);
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div className="flex mt-4 flex-col w-full bg-white">
      <div className="w-full bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-8">
        <div className="flex text-[#423F3F] mb-6">
          <form className="space-y-4 md:pl-[600px] w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-[#A51910] font-bold mb-2">Contact Us</h1>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-600"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-600"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-700"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#A51910] text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="text-green-600 mt-2">Message sent successfully!</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        </div>
      </div>

      <div className="relative mt-0 flex flex-col items-center justify-center ">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
