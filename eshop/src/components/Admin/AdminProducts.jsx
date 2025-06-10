import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  clearAdminProductState,
  uploadProductImage,
  deleteProductImage,
} from "../../redux/slices/adminProductSlice";
import { FaTrash, FaPen } from "react-icons/fa";

export default function AdminProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    success: imgSuccess,
    error: imgError,
    message: imgMessage,
    products,
    loading,
    success,
    message,
    error,
  } = useSelector((state) => state.adminProducts);

  // State for edit mode
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(clearAdminProductState()), 3000);
    }
  }, [success, error, dispatch]);

  // When clicking pencil icon - open edit form and fill data
  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
  };

  // Handle input changes in edit form
  const handleInputChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit updated product details
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("price", editData.price);
    formData.append("description", editData.description);
    formData.append("stock", editData.stock);
    // You can add image upload here if you want

    dispatch(updateProduct({ id: editId, formData }));
    setEditId(null);
  };

  // Delete product confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Upload new image
  const handleImageUpload = (productId, file) => {
    if (!file) return;
    dispatch(uploadProductImage({ productId, imageFile: file }));
  };

  // Delete image
  const handleImageDelete = (productId, imageId) => {
    if (
      window.confirm("Are you sure you want to delete this image from product?")
    ) {
      dispatch(deleteProductImage({ productId, imageId }));
    }
  };
  useEffect(() => {
    if (imgSuccess) {
      dispatch(fetchProducts());
      dispatch(clearAdminProductState()); // reset imgSuccess and imgMessage
    }
  }, [imgSuccess, dispatch]);

  useEffect(() => {
    if (imgMessage || imgError) {
      const timer = setTimeout(() => {
        dispatch(clearAdminProductState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [imgMessage, imgError, dispatch]);

  // Sort and paginate products
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 mt-4 py-1 border rounded-full ${
            currentPage === i ? "bg-red-700 text-white" : "bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Admin - Manage Products</h2>

        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900">
            Export
          </button>
          <button
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
            onClick={() => navigate("/admin/add-products")}
          >
            + Add Product
          </button>
        </div>
      </div>
      <div className="m-4">
        <label className="mr-2 font-medium">Sort by Price:</label>
        <select
          className="border p-1 rounded"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1); // reset page when sort changes
          }}
        >
          <option value="default">All Products</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {imgMessage && <p className="text-green-600">{imgMessage}</p>}
      {imgError && <p className="text-red-600">{imgError}</p>}
      {loading && <p className="text-blue-600 mb-4">Loading...</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="min-w-full text-sm text-left bg-white shadow rounded overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price ($)</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.map((prod) =>
            editId === prod._id ? (
              <tr key={prod._id} className="bg-yellow-50">
                <td className="border border-gray-300 p-2">
                  <img
                    src={prod.images?.[0]?.url}
                    alt={prod.name}
                    className="h-6 w-6 object-cover"
                  />

                  <label className="text-blue-600 hover:underline cursor-pointer">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(prod._id, e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                  {prod.images?.[0] && (
                    <button
                      onClick={() =>
                        handleImageDelete(prod._id, prod.images[0]._id)
                      }
                      className="text-red-600 text-xs mt-1 hover:underline"
                    >
                      Delete Image
                    </button>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    name="stock"
                    value={editData.stock}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={handleUpdateSubmit}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <img
                    src={prod.images?.[0]?.url}
                    alt={prod.name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{prod.name}</td>
                <td className="border border-gray-300 p-2">{prod.price}</td>
                <td className="border border-gray-300 p-2 truncate max-w-xs">
                  {prod.description}
                </td>
                <td className="border border-gray-300 p-2 truncate max-w-xs">
                  {prod.stock}
                </td>
                <td className="border border-gray-300 p-2 space-x-3 text-center">
                  <button
                    onClick={() => handleEditClick(prod)}
                    title="Edit Product"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    title="Delete Product"
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {loading && <p className="text-blue-600 mb-4">Loading...</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-600 text-center mt-6">
          No products found in the database.
        </p>
      )}
      <div className="flex justify-center items-center mb-4">
        <div className="flex gap-2 hover:bg-gray-50">{renderPageNumbers()}</div>
      </div>
    </div>
  );
}
