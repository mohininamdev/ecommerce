// src/pages/AdminProductDetails.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductDetails } from "../../redux/slices/adminProductSlice";

export default function AdminProductDetails() {
const { id } = useParams();
  const dispatch = useDispatch();
    // const navigate = useNavigate();
  
  const { productDetails } = useSelector((state) => state.adminProducts);

   useEffect(() => {
      dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

  if (!productDetails) {
    return <div className="p-6 text-red-600">Product not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="space-y-2">
        <p><strong>ID:</strong> {productDetails._id}</p>
        <p><strong>Name:</strong> {productDetails.name}</p>
        <p><strong>Description:</strong> {productDetails.description}</p>
        <p><strong>Price:</strong> ₹{productDetails.price}</p>
        <p><strong>Stock:</strong> {productDetails.stock}</p>
        <p><strong>Category:</strong> {productDetails.category}</p>
        <p><strong>Rating:</strong> {productDetails.rating}</p>
        <p><strong>Reviews:</strong> {productDetails.reviews?.length || 0}</p>
        <p><strong>Created At:</strong> {new Date(productDetails.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(productDetails.updatedAt).toLocaleString()}</p>

        {productDetails.images.length > 0 && (
          <div>
            <strong>Images:</strong>
            <div className="flex gap-4 mt-2">
              {productDetails.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt="product"
                  className="w-28 h-28 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
