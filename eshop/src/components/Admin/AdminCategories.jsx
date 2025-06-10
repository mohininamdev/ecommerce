import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "../../redux/slices/adminCategorySlice";
import { useNavigate } from "react-router-dom";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector(
    (state) => state.adminCategories
  );

  const [editingId, setEditingId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewCategoryName(currentName);
  };

  const handleUpdate = () => {
    dispatch(
      updateCategory({ id: editingId, updatedCategory: newCategoryName })
    );
    setEditingId(null);
    setNewCategoryName("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => navigate("/admin/categories/add-categories")}
          className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 text-center mt-8 text-lg">
          No categories available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 relative"
            >
              {editingId === category._id ? (
                <>
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleUpdate}
                      disabled={newCategoryName.trim() === ""}
                      className={`text-sm px-2 py-1 rounded text-white ${
                        newCategoryName.trim() === ""
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-800"
                      }`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg">{category.category}</h3>
                  <p className="text-sm text-gray-500">
                    {category.productCount} Products
                  </p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(category._id, category.category)
                      }
                      className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
