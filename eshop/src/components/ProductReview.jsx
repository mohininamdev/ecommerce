import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview, clearProductState } from "../redux/slices/productSlice";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const ProductReview = ({ productId }) => {
  const dispatch = useDispatch();

  const { loading, error, message, success } = useSelector(
    (state) => state.products
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide both rating and comment");
      return;
    }

    dispatch(submitReview({ id: productId, reviewData: { rating, comment } }));
  };

  useEffect(() => {
  if (success) {
    toast.success(message || "Review submitted!");
    setShowReviewForm(false);
    setRating(0);
    setComment("");

    // Automatically clear success after 3 seconds
    const timeout = setTimeout(() => {
      dispatch(clearProductState());
    }, 2000);

    return () => clearTimeout(timeout);
  }

  if (error) {
    toast.error(error);
  }
}, [success, error, message, dispatch]);

  return (
    <div className="mt-10">
      <button
        onClick={() => setShowReviewForm(true)}
        className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-full"
      >
        <Plus size={18} /> Submit Review
      </button>

      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1 font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="">Select rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>

              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full mb-4 p-2 border rounded"
                placeholder="Write your review..."
                rows={4}
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
