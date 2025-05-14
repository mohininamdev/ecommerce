import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaTags,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import profileIcon from "../../assets/profile.png";

const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaShoppingCart /> },
    { name: 'Products', path: '/admin/products', icon: <FaBox /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaTags /> },
    { name: 'Customers', path: '/admin/customers', icon: <FaUsers /> },
  ];

export default function AdminSidebar({ isExpanded, setIsExpanded }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setIsExpanded(false);
  };

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsExpanded(false);
    }, 300);
  };

  return (
    <div className={`fixed top-20 left-0 h-full bg-red-800 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-end p-2">
    <button
      className="text-white text-sm px-2 py-1 rounded hover:bg-red-900 transition"
      onClick={() => setIsExpanded(prev => !prev)}
    >
      {isExpanded ? '<' : '>'}
    </button>
  </div>
      <div className="flex flex-col py-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 hover:bg-red-900 transition-colors ${
                isActive ? 'bg-red-900 font-semibold' : ''
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {isExpanded && <span>{link.name}</span>}
          </NavLink>
        ))}

        {user && (
          <div className="mt-4 px-4">
            <div className="border-t border-gray-500 my-2" />
            <div className="flex items-center gap-3">
              <img src={profileIcon} alt="Visual" className="w-8 h-8" />
              {isExpanded && <span className="text-sm">Welcome, {user.email}</span>}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 mt-2 text-white bg-red-800 py-2 w-full rounded hover:bg-red-900 text-sm"
            >
              <FaSignOutAlt />
              {isExpanded && <span>Logout</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}