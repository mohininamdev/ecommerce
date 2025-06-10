import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchProducts } from "../redux/slices/productSlice";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSearchProducts(keyword));
  }, [dispatch, keyword]);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {keyword ? `Results for "${keyword}"` : "All Products"}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="gap-4">
          {products.map((product) => (
            <div key={product._id} className="p-2">
              <h3 className="font-bold">{product.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
