import React from "react";
import { useNavigate } from "react-router-dom";
import blackWhite from "../../assets/adminProductImg/black-white-tshirt.png"
import hat from "../../assets/adminProductImg/hat.png"
import casualClothes from "../../assets/adminProductImg/danim-shirt.png"
import whiteTop from "../../assets/adminProductImg/white-top.png"
import whiteTshirt from "../../assets/adminProductImg/white-tshirt.png"
import accessories from "../../assets/adminProductImg/accessories.png"
import suite from "../../assets/adminProductImg/suite.png"
import balackTop from "../../assets/adminProductImg/black-top.png"
import springCollection from "../../assets/adminProductImg/spring-collection.png"

const adminCategories = [
  {
    name: "Men Clothes",
    items: 24,
    image: balackTop,
  },
  {
    name: "Women Clothes",
    items: 12,
    image: blackWhite,
  },
  {
    name: "Accessories",
    items: 43,
    image: accessories,
  },
  {
    name: "Cotton Clothes",
    items: 31,
    image: whiteTop,
  },
  {
    name: "Summer Clothes",
    items: 26,
    image: whiteTshirt ,
  },
  {
    name: "Wedding Clothes",
    items: 52,
    image: suite,
  },
  {
    name: "Spring Collection",
    items: 24,
    image: springCollection,
  },
  {
    name: "Casual Clothes",
    items: 52,
    image: casualClothes,
  },
  {
    name: "Hats",
    items: 26,
    image: hat,
  },
];

const AdminCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button 
        onClick={() => navigate("/admin/categories/add-categories")}
        className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900">
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white min-w-full rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative group">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover min-w-full"
              />
              <button className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow text-sm hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
                Edit
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.items} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
