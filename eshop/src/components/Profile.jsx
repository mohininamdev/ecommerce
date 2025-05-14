import React from "react";
import Bg2 from "../assets/bg2profile.png";

import { Link } from "react-router-dom";
import Footer from "./Footer";
const Profile = () => {
    return (
      <div>
      <div
              className="absolute top-0 h-full flex flex-col md:flex-row items-center justify-center w-full min-h-[600px] bg-cover bg-center px-6 md:px-20 font-sans"
              style={{ backgroundImage: `url(${Bg2})` }}
            >  
              
      <div className=" bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-3xl w-96 p-8">
        <div className="flex justify-around text-[#423F3F] mb-6 relative">
        <span><Link to="/login" className="hover:underline">Log In</Link> </span>
        <span><Link to="/signup" className="hover:underline">Sign Up</Link></span>
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full mb-4 border-b placeholder-[#423F3F] border-[#423F3F] bg-transparent py-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 border-b placeholder-[#423F3F] border-[#423F3F] bg-transparent py-2 focus:outline-none"
        />
        <button className="w-full bg-red-600 text-white py-2 rounded-full shadow-md hover:bg-red-700 transition">
          LOG IN
        </button>
      </div>
    </div>
    <div className=" absolute mt-[672px] flex flex-col items-center justify-center space-y-6 md:space-y-8 ">
        <Footer/>
      </div>
    </div>
  );
};
export default Profile;
