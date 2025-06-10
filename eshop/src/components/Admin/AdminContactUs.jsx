// components/AdminContactMessages.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../redux/slices/contactUsSlice";

const AdminContactUs = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.contactUs);

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">S. No</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg._id} className="border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{msg.user ? msg.user.name : "Guest User"}</td>
                <td className="p-2 border">{msg.email}</td>
                <td className="p-2 border">{msg.message}</td>
                <td className="p-2 border">{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactUs;
