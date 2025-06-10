import React, { useState, useEffect } from "react";

import { Pencil, Trash2, X, CheckCircle } from "lucide-react"; // Include X and success icons
import { useNavigate } from "react-router-dom";

import {} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  changeOrderStatus,
  clearOrderStatusState,
} from "../../redux/slices/adminOrderSlice";

const statuses = ["All", "processing", "shipped", "deliverd"];
const itemsPerPage = 7;

export default function OrdersTable() {
  // const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeletedMsg, setShowDeletedMsg] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    statusChanged,
    message,
    error,
    orders = [],
    userName,
  } = useSelector((state) => state.adminOrders || {});

  const { user } = useSelector((state) => state.auth);
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" || order.orderStatus === statusFilter;
    const matchesSearch = order._id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    dispatch(getAllOrders({ userName }));
  }, [userName, dispatch]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedOrders.includes(o.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedOrders(
        selectedOrders.filter((id) => !paginatedOrders.some((o) => o.id === id))
      );
    } else {
      const newSelections = paginatedOrders
        .map((order) => order._id)
        .filter((id) => !selectedOrders.includes(id));
      setSelectedOrders([...selectedOrders, ...newSelections]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedOrders.length > 0) {
      setShowConfirm(true);
    }
  };

  const confirmDelete = () => {
    // setOrders(prev => prev.filter(order => !selectedOrders.includes(order.id)));
    setSelectedOrders([]);
    setShowConfirm(false);
    setShowDeletedMsg(true);
    setTimeout(() => setShowDeletedMsg(false), 2000);
  };

  const exportToCSV = () => {
    const headers = [
      "Order",
      "Date",
      "Customer",
      "Payment Status",
      "Order Status",
      "Total",
    ];
    const rows = paginatedOrders.map((order) => [
      order._id,
      order.date,
      order.userName,
      order.paymentStatus,
      order.orderStatus,
      `$${order.total.toFixed(2)}`,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportSuccess(true);
  };

  const handleStatusChange = (_id, newStatus) => {
    if (user?.role !== "admin") {
      alert("Unauthorized: Only admins can change order status.");
      return;
    }
    if (window.confirm(`Change status to ${newStatus}?`)) {
      dispatch(changeOrderStatus({ _id, orderStatus: newStatus }));
    }
  };

  useEffect(() => {
    if (statusChanged || message || error) {
      setTimeout(() => {
        dispatch(clearOrderStatusState());
        // Optionally: re-fetch orders
      }, 3000);
    }
  }, [statusChanged, message, error, dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
            onClick={exportToCSV}
          >
            Export
          </button>
          <button
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
            onClick={() => navigate("/admin/add-products")}
          >
            + Add Order
          </button>
        </div>
      </div>

      <div className="p-6 bg-white w-full max-h-screen space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              className="border rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by Order #"
              className="border rounded px-3 py-2 min-w-52 md:min-w-76"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <Pencil
              size={18}
              className="hover:text-red-800 flex text-gray-600 cursor-pointer"
            />
            <button
              className="flex text-red-700 hover:text-red-800"
              onClick={handleDeleteClick}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded overflow-x-auto">
          {error && <div className="text-red-600 font-semibold">{error}</div>}
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr className=" text-gray-700 text-sm">
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2">Order</th>
                <th className="p-2">Date</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Payment Status</th>
                <th className="p-2">Order Status</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order._id} className="border-t text-sm">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => toggleSelectOne(order._id)}
                    />
                  </td>
                  <td className="p-2 text-red-700 font-medium">{order._id}</td>
                  <td className="p-2 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">{order.user?.name || "Unknown User"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.paymentStatus === "COD"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    {/* //                   onClick={() => handleStatusChange(order._id)}
//       className="p-2 text-blue-600 cursor-pointer hover:underline"
//  >
//                      {order.orderStatus} */}
                  </td>
                  <td className="p-2 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>Total: {filteredOrders.length} entries</div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-center text-sm text-gray-700">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border bg-white hover:bg-gray-50"
              disabled={currentPage === 1}
            >
              ←
            </button>
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-red-800 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border bg-white hover:bg-gray-50"
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white md:w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-2 right-2"
            >
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>
            <h3 className="text-lg font-bold mb-2">Delete Items?</h3>
            <p className="text-sm mb-6">
              Are you sure you want to delete the selected items?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Popup */}
      {showDeletedMsg && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white flex justify-center items-center md:w-96 p-6 rounded-lg shadow-lg relative gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-2 right-2"
            >
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>
            <CheckCircle className="text-red-600 " size={24} />
            <div className="text-sm font-medium text-red-600">
              Deleted successfully!
            </div>
          </div>
        </div>
      )}

      {showExportSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Icon */}
            <button
              onClick={() => setShowExportSuccess(false)}
              className="absolute top-2 right-2"
            >
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>

            {/* Success Icon + Message */}
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500" size={48} />
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Export Successful
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Your order list has been exported successfully.
              </p>

              {/* Continue Button */}
              <button
                onClick={() => setShowExportSuccess(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
