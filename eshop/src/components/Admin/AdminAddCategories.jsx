import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blackWhite from "../../assets/adminProductImg/black-white-tshirt.png"
import hat from "../../assets/adminProductImg/hat.png"
import casualClothes from "../../assets/adminProductImg/danim-shirt.png"
import whiteTshirt from "../../assets/adminProductImg/white-tshirt.png"
import accessories from "../../assets/adminProductImg/accessories.png"
import suite from "../../assets/adminProductImg/suite.png"
import balackTop from "../../assets/adminProductImg/black-top.png"
import springCollection from "../../assets/adminProductImg/spring-collection.png"
import { Pencil, Trash2 } from "lucide-react";

const productCategories = [
    { id: 1, image: balackTop, name: "Men Clothes" },
    { id: 2, image: blackWhite, name: "Women Clothes" },
    { id: 3, image: accessories, name: "Accessories" },
    { id: 4, image: blackWhite, name: "Cotton Clothes" },
    { id: 5, image: suite, name: "Wedding Clothes" },
    { id: 6, image: whiteTshirt, name: "Summer Clothes" },
    { id: 7, image: springCollection, name: "Spring Collection" },
    { id: 8, image: casualClothes, name: "Casual Clothes" },
    { id: 9, image: hat, name: "Hats" },
  ];

const AdminAddCategories = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [categoryName, setCategoryName] = useState("Women Clothes");
  const [productsCategories] = useState(productCategories);

  const handleSave = () => {
    // Save logic here (API call or local state update)
    console.log("Category saved:", { categoryName, visible, productsCategories });
    navigate("/admin/categories");
  };

  return (
    <div className="p-6">
      {/* Top Header */}
      <button onClick={() => navigate(-1)} className="text-sm text-red-500 mb-4">
        &larr; Back
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Women Clothes</h2>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/admin/categories")}
            className="px-4 py-2 border bg-red-600 text-white border-gray-300 rounded hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold">Products <span className="text-gray-500 text-sm">({productsCategories.length})</span></h3>
          {productsCategories.map((product, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-3 border rounded shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded mr-4"
              />
              <span className="flex-1">{product.name}</span>
              <div className="space-x-2">
                <Pencil size={18} className="hover:text-red-500 flex text-gray-600 cursor-pointer" />
                <button className="flex text-red-700 hover:text-red-800">
                    <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-2 border border-dashed border-gray-400 text-red-500 rounded hover:bg-red-600">
            + Add Product
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Visibility Toggle */}
          <div className="bg-white p-4 rounded shadow">
            <label className="flex items-center justify-between">
              <span className="font-medium">Category Visibility</span>
              <input
                type="checkbox"
                checked={visible}
                onChange={() => setVisible(!visible)}
                className="toggle toggle-primary"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              {visible ? "Visible on site" : "Hidden from site"}
            </p>
          </div>

          {/* Category Info */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div>
              <label className="text-sm font-medium">Category Name</label>
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                className="mt-1 w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Image</label>
              <div className="border border-dashed border-gray-300 p-4 text-center rounded">
                <input type="file" className="hidden" id="categoryImage" />
                <label htmlFor="categoryImage" className="cursor-pointer text-blue-600">
                  Add File
                </label>
                <p className="text-sm text-gray-400 mt-1">Or drag and drop files</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons for smaller screens */}
      <div className="flex justify-end mt-6 lg:hidden gap-2">
        <button
          onClick={() => navigate("/admin/categories")}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminAddCategories;
