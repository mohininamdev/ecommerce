import React from "react";  
import Footer from "./Footer";


const Contact = () => {
  return (
    <div className="flex mt-4 flex-col w-full bg-white">
        
        <div className="w-full bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-8">
          <div className="flex text-[#423F3F] mb-6">
            <form className="space-y-4 md:pl-[600px] w-full">
              <h1 className="text-3xl text-[#A51910] font-bold mb-2">Contact Us</h1>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-600"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="5"
                  className="w-1/2 p-3 border rounded-md focus:outline-none placeholder-gray-600 focus:ring-2 bg-transparent focus:ring-gray-700"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#A51910] text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
              >
                Send Message
              </button>
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
