import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // ✅ get ID from route
import { fetchUserById } from "../../redux/slices/adminSlice";

const AdminUserDetails = () => {
  const { id } = useParams(); // ✅ this should match the route param like /admin/user/:id
  const dispatch = useDispatch();
  const { singleUser, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id)); // ✅ pass ID to thunk
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!singleUser) return <p>User not found</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <p><strong>ID:</strong> {singleUser._id}</p>
      <p><strong>Name:</strong> {singleUser.name}</p>
      <p><strong>Email:</strong> {singleUser.email}</p>
      <p><strong>Phone:</strong> {singleUser.phone || "N/A"}</p>
      <p><strong>Address:</strong> {singleUser.address || "N/A"}</p>
      <p><strong>Role:</strong> {singleUser.role}</p>
      <p><strong>Joined:</strong> {new Date(singleUser.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default AdminUserDetails;
