import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import checkIcon from "../assets/checkout.png";
import profileIcon from "../assets/profile.png";
import searchIcon from "../assets/search.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
 

  return (
    <nav 
      className="fixed top-0 rounded-br-[60px] left-0 right-0 w-full z-40 transition-all bg-cover bg-center shadow-md bg-white"
  
    >
      <div className="shadow-md rounded-br-[60px] 
      max-w-full flex items-center justify-between h-[80px]">
        
        {/* Logo */}
        <Link to="/">
        <span className="text-[#A51910] text-[28px] font-bold ml-16">E-SHOP</span>
        </Link>
        {/* Centered Search Bar */}
        <div className="hidden md:flex relative w-full max-w-[300px] flex-grow lg:ml-96 lg:mr-6">
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            placeholder="Search Products"
            className="w-full h-[40px] bg-[#EFEFEF] text-[#6D6D6D] text-[13px] font-medium pl-10 rounded-full shadow-md outline-none"
          />
        </div>

        {/* Desktop Menu - Centered */}
        <ul className="hidden md:flex space-x-9 text-[#2D2B2B] text-[13px] font-medium">
          <li><Link to="/" className="hover:underline">HOME</Link></li>
          <li><Link to="/product" className="hover:underline">PRODUCTS</Link></li>
          <li><Link to="/about" className="hover:underline">ABOUT</Link></li>
          <li><Link to="/contact" className="hover:underline">CONTACT</Link></li>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex space-x-9 mr-[64px]">
          <Link to="/checkout">
            <img src={checkIcon} alt="Checkout" className="w-7 h-7 cursor-pointer hover:opacity-80" />
          </Link>
          <div className="relative">
            <img
              src={profileIcon}
              alt="Profile"
              className="w-7 h-7 cursor-pointer hover:opacity-80"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <Link 
                  to="/createaccount" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  Create an Account
                </Link>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  Login
                </Link>
                {user && (
                  <div>
                  <div className="flex items-center">
                    <span className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-1000">Welcome, {user.email}</span>
                   
                  </div>
                  
                   <button
                   onClick={handleLogout}
                   className="m-4 text-white bg-red-800 px-4 py-1 rounded hover:bg-red-600 text-sm"
                 >
                   Logout
                 </button>
                 </div>


                )}
                
              </div>
            )}
          </div>
          {/* <Link to="/profile">
            <img src={profileIcon} alt="Profile" className="w-7 h-7 cursor-pointer hover:opacity-80" />
          </Link> */}
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className=" absolute z-50 right-0 left-0 w-full bg-gray-100 shadow-md flex flex-col items-center py-4 space-y-3 md:hidden">
          <li><Link to="/" className="text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>HOME</Link></li>
          <li><Link to="/product" className="text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>PRODUCTS</Link></li>
          <li><Link to="/about" className="text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>ABOUT</Link></li>
          <li><Link to="/contact" className="text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>CONTACT</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
