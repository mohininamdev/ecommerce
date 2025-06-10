import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateProduct = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { loading, success, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can access this page");
      navigate("/login"); // Redirect to home or any other page
    }
  }, [user, navigate]);

  useEffect(() => {
    if (success) {
      toast.success("Product created successfully!");
      navigate("/admin/products"); // adjust this route as needed
    }
  }, [success, navigate]);

  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("file", formData.image); // assuming backend expects "file"

    dispatch(createProduct(data));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
             min="0"
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <input
            id="category"
            name="category"
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block font-medium mb-1">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
             min="0"
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Product Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
