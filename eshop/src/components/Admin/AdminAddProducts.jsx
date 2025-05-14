import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminAddProducts = () => {
  const [multipleOptions, setMultipleOptions] = useState(true);
  const [isDigital, setIsDigital] = useState(false);
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [tags] = useState(['T-Shirt', 'Men Clothes', 'Summer Collection']);
  const sizeOptions = ['S', 'M', 'L', 'XL'];
  
  // const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();

  const handleAddMore = () => {
    setShowSizeDropdown(true);  // Open the dropdown again
  };

  return (
    <div className="p-6 bg-gray-50">
      <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-red-600 hover:text-red-800 mb-4"
                  >
                  <FiArrowLeft className="mr-2" />
                  Back
      </button>
      

      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Product Name */}
          <div>
            <h3 className="block font-medium mb-3">Information</h3>
            <label className="block text-gray-400">Product Name</label>
            <input
              type="text"
              placeholder="Summer T-Shirt"
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400">Product Description</label>
            <textarea
              placeholder="Product description"
              rows={3}
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium mb-3">Images</label>
            <div className="border-2 border-dashed rounded-md p-6 text-center text-gray-500 cursor-pointer">
              <label htmlFor="image-upload" className="cursor-pointer">
                Add File<br />
                <span className="text-sm">Or drag and drop image files</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*" // Only allows image files
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    // Handle the uploaded image file here
                    const imageFile = files[0];
                    console.log(imageFile);
                  }
                }}
              />
            </div>
          </div>


          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <h3 className="block font-medium mb-3">Price</h3>
              <label className="block text-gray-400">Product Price</label>
              <input
                type="text"
                placeholder="Enter price"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-400 md:mt-9">Discount Price</label>
              <input
                type="text"
                placeholder="Price at Discount"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>

          {/* Tax Toggle */}
          <div className="flex items-center gap-2 mt-2">


          
            <input
              type="checkbox"
              checked={taxEnabled}
              onChange={(e) => setTaxEnabled(e.target.checked)}
            />
            <span>Add tax for this product</span>
          </div>

          {/* Product Options */}
          <div>
          <h3 className="block font-medium mb-2">Different Options</h3>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={multipleOptions}
                onChange={(e) => setMultipleOptions(e.target.checked)}
              />
              <span>This product has multiple options</span>
            </div>

            {/* <button
      onClick={() => setIsOn(!isOn)}
      checked={multipleOptions}
      onChange={(e) => setMultipleOptions(e.target.checked)}
      className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >

      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-8" : "translate-x-0"
        }`}
      />
      
    </button>
    <span>This product has multiple options</span> */}

                  

            {multipleOptions && (
              <div className="space-y-2">
                <label className="block font-medium mb-2">Option 1</label>
                <div className="flex gap-2">
                <div className="relative w-60">
                  <div
                    onClick={() => setShowSizeDropdown((prev) => !prev)}
                    className="border px-3 py-2 rounded-md cursor-pointer bg-white"
                  >
                    {selectedSizes.length === 0 ? (
                      <span className="text-gray-400">Select Sizes</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedSizes.map((size) => (
                          <span
                            key={size}
                            className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                          >
                            {size}
                            <X
                              size={12}
                              className="ml-1 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent dropdown toggle
                                setSelectedSizes((prev) => prev.filter((s) => s !== size));
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {showSizeDropdown && (
                    <div className="absolute mt-1 z-10 w-full border rounded-md bg-white shadow">
                      {sizeOptions.map((size) => (
                        <label key={size} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => {
                              if (selectedSizes.includes(size)) {
                                setSelectedSizes((prev) => prev.filter((s) => s !== size));
                              } else {
                                setSelectedSizes((prev) => [...prev, size]);
                              }
                            }}
                            className="mr-2"
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                </div>
                <button 
                type="button"
                className="text-blue-600 text-sm mt-2"
                onClick={handleAddMore}
                >
                  Add More
                </button>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <h3 className="block font-medium mb-3">Shipping</h3>
              <label className="block text-gray-400">Weight</label>
              <input
                type="text"
                placeholder="Enter Weight"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-400 md:mt-9">Country</label>
              <select className="w-full border px-3 py-2 rounded-md">
                <option>Select Country</option>
                <option>USA</option>
                <option>UK</option>
                <option>Germany</option>
                <option>India</option>
              </select>
            </div>
          </div>

          {/* Digital Item */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isDigital}
              onChange={(e) => setIsDigital(e.target.checked)}
            />
            <span>This is a digital item</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <label className="block font-medium mb-2">Categories</label>
            {['Women', 'Men', 'T-Shirt', 'Hoodie', 'Dress'].map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{cat}</span>
              </div>
            ))}
            <button className="text-blue-600 text-sm mt-2">Create New</button>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-2">Tags</label>
            <input
              type="text"
              placeholder="Enter tag name"
              className="w-full border px-3 py-2 rounded-md"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                >
                  {tag}
                  <X size={12} className="ml-1 cursor-pointer" />
                </span>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div>
            <label className="block font-medium mb-2">SEO Settings</label>
            <input
              type="text"
              placeholder="Title"
              className="mb-2 w-full border px-3 py-2 rounded-md"
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminAddProducts;
