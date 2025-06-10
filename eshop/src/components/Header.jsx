import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice"; // Adjust the path as needed
import { fetchSearchProducts } from "../redux/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import checkIcon from "../assets/checkout.png";
import profileIcon from "../assets/profile.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  
    const [searchParams, setSearchParams ] = useSearchParams();
    
    const keyword = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = useState(keyword);
  const [showDropdown, setShowDropdown] = useState(false);
  
    const { products, loading, error } = useSelector((state) => state.products);
  
    useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        setSearchParams({ search: searchTerm.trim() });
      } else {
        setSearchParams({});
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, setSearchParams]);

  // Fetch search results from redux when URL param changes
  useEffect(() => {
    if (keyword.trim()) {
      dispatch(fetchSearchProducts(keyword));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [keyword, dispatch]);

  // When user clicks a dropdown item
  const handleSelect = (product) => {
    setSearchTerm(product.name);
    setShowDropdown(false);
    navigate(`/product/${product._id}`);
  };
  
    if (loading) return <p className="p-4">Loading products...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  // const user = JSON.parse(localStorage.getItem("user"));

  // const handleLogout = async () => {

  //   await dispatch(logoutUser());
  //    setShowProfileDropdown(false);
  //   navigate("/login");
  // };
  const handleLogout = async () => {
    // localStorage.removeItem("user");
    try {
      await dispatch(logoutUser()).unwrap(); // unwrap handles real promise
      setShowProfileDropdown(false); // close dropdown
      navigate("/login"); // redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 rounded-br-[60px] left-0 right-0 w-full z-40 transition-all bg-cover bg-center shadow-md bg-white">
      <div
        className="shadow-md rounded-br-[60px] 
      max-w-full flex items-center justify-between h-[80px]"
      >
        {/* Logo */}
        <Link to="/">
          <span className="text-[#A51910] text-[28px] font-bold ml-16">
            E-SHOP
          </span>
        </Link>
        {/* Centered Search Bar */}
        <div className="hidden md:flex relative w-full max-w-[300px] flex-grow lg:ml-96 lg:mr-6">
          <HiMagnifyingGlass
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
      
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Search products..."
            className="w-full h-[40px] bg-[#EFEFEF] border-gray-300 text-[#6D6D6D] text-[13px] font-medium pl-10 rounded-full shadow-md outline-none"
          />

          
          {showDropdown && (
            <ul className="absolute z-50 w-full bg-[#EFEFEF] mt-12 max-h-64 overflow-auto shadow-lg">
              {loading && <li className="p-2 text-gray-500">Loading...</li>}
              {!loading && products.length === 0 && (
                <li className="p-2 text-gray-500">No results found</li>
              )}
              {!loading &&
               products.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSelect(product)}
                  >
                    {product.name}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Desktop Menu - Centered */}
        <ul className="hidden md:flex space-x-9 text-[#2D2B2B] text-[13px] font-medium">
          <li>
            <Link to="/" className="hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/product" className="hover:underline">
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex space-x-9 mr-[64px]">
          <Link to="/cart">
            <img
              src={checkIcon}
              alt="Checkout"
              className="w-7 h-7 cursor-pointer hover:opacity-80"
            />
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
                {!user && (
                  <>
                    <Link
                      to="/register"
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
                  </>
                )}
                {user && (
                  <div>
                    <Link to="/profile">
                      <div className="flex items-center">
                        <span className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-1000">
                          Welcome, {user.name}
                        </span>
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <div>
                      <Link
                        to="/updatePassword"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Change Password
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/order"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <Link to="/profile">
            <img src={profileIcon} alt="Profile" className="w-7 h-7 cursor-pointer hover:opacity-80" />
          </Link> */}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className=" absolute z-50 right-0 left-0 w-full bg-gray-100 shadow-md flex flex-col items-center py-4 space-y-3 md:hidden">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
