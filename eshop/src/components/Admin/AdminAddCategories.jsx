import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../redux/slices/adminCategorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { category } = req.body;

  const user = useSelector((state) => state.auth.user); // Get user from Redux

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can access this page");
      navigate("/login"); // Redirect to home or any other page
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!category.trim()) return;

  try {
    const resultAction = await dispatch(createCategory( category ));

    if (createCategory.fulfilled.match(resultAction)) {
      // resultAction.payload could be: { success, message, category }
      toast.success(resultAction.payload.message || "Category created");
      navigate("/admin/categories");
    } else {
      // resultAction.payload might be the error object
      const errorMessage =
        resultAction.payload?.message || "Failed to create category";
      toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Unexpected error creating category:", err);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

