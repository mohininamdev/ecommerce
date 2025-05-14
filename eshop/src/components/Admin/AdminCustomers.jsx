import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Importing useNavigate from React Router
import { Pencil, Trash2, X, CheckCircle } from 'lucide-react';
import { customers as initialCustomers } from './CustomersData';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("All");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeletedMsg, setShowDeletedMsg] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  
  const customersPerPage = 9;
  const navigate = useNavigate(); // Initialize navigate hook


  // Filtering logic
  let filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filterType === "Min Orders") {
    const minOrder = Math.min(...customers.map(c => c.orders));
    filteredCustomers = filteredCustomers.filter(c => c.orders === minOrder);
  } else if (filterType === "Max Orders") {
    const maxOrder = Math.max(...customers.map(c => c.orders));
    filteredCustomers = filteredCustomers.filter(c => c.orders === maxOrder);
  } else if (filterType === "Min Spent") {
    const minSpent = Math.min(...customers.map(c => c.spent));
    filteredCustomers = filteredCustomers.filter(c => c.spent === minSpent);
  } else if (filterType === "Max Spent") {
    const maxSpent = Math.max(...customers.map(c => c.spent));
    filteredCustomers = filteredCustomers.filter(c => c.spent === maxSpent);
  }

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const isAllSelected = paginatedCustomers.length > 0 && paginatedCustomers.every(o => selectedCustomers.includes(o.id));
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const startIdx = (currentPage - 1) * customersPerPage;
  const currentCustomers = filteredCustomers.slice(startIdx, startIdx + customersPerPage);

  const handleCustomerClick = (customerId) => {
    navigate(`/customer-details/${customerId}`);
  };


  const handleDeleteClick = () => {
    if (selectedCustomers.length > 0) {
      setShowConfirm(true);
    }
  };
  const confirmDelete = () => {
    setCustomers(prev => prev.filter(order => !selectedCustomers.includes(order.id)));
    setSelectedCustomers([]);
    setShowConfirm(false);
    setShowDeletedMsg(true);
    setTimeout(() => setShowDeletedMsg(false), 2000);
  };
  
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCustomers(selectedCustomers.filter(id => !paginatedCustomers.some(o => o.id === id)));
    } else {
      const newSelections = paginatedCustomers
        .map(order => order.id)
        .filter(id => !selectedCustomers.includes(id));
        setSelectedCustomers([...selectedCustomers, ...newSelections]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedCustomers(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Location', 'Orders', 'Spent'];
    const rows = filteredCustomers.map(c => [
      c.name,
      c.location,
      c.orders,
      `$${c.spent.toFixed(2)}`
    ]);
  
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customers_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setShowExportSuccess(true);
  };
  

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
          onClick={exportToCSV}
          >Export</button>

          <button className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
                  onClick={() => navigate("/admin/add-customer")}
                  >+ Add Customer</button>

        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white w-full max-h-screen space-y-6">
        <div className="flex max-w-full space-x-2 text-xs md:space-x-4 font-medium text-gray-600 overflow-x-auto">
          {['All Customers', 'New Customers', 'From Europe', 'Returning Customers'].map((tab, i) => (
            <button key={i} className="hover:text-blue-600 focus:text-blue-600">{tab}</button>
          ))}
        </div>

        <div className="p-6 bg-white w-full max-h-screen space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-4 mb-4">
              <select
                className="border rounded px-3 py-2"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                >
                <option>All</option>
                <option>Min Orders</option>
                <option>Max Orders</option>
                <option>Min Spent</option>
                <option>Max Spent</option>
              </select>

              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-2 min-w-52 md:min-w-76"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <Pencil size={18} className="hover:text-red-800 flex text-gray-600 cursor-pointer" />
                <button
                  className="flex text-red-700 hover:text-red-800"
                  onClick={handleDeleteClick}
                >
                  <Trash2 size={18} />
                </button>
            </div>
        </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">
                <input type="checkbox"
                       checked={isAllSelected}
                       onChange={toggleSelectAll} 
                
                /></th>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Spent</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedCustomers.includes(customer.id)}
                    onChange={() => toggleSelectOne(customer.id)}
                    
                    /></td>
                  <td
                    className="p-3 flex items-center gap-2 cursor-pointer text-blue-600"
                    onClick={() => handleCustomerClick(customer.id)} // Navigate on click
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                      {customer.name.charAt(0)}
                    </div>
                    {customer.name}
                  </td>
                  <td className="p-3">{customer.location}</td>
                  <td className="p-3">{customer.orders}</td>
                  <td className="p-3">${customer.spent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>{filteredCustomers.length} Results</div>

        {/* Pagination */}
        <div className="flex justify-center items-center text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ←
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-red-800 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
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
            <button onClick={() => setShowConfirm(false)} className="absolute top-2 right-2">
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>
            <h3 className="text-lg font-bold mb-2">Delete Items?</h3>
            <p className="text-sm mb-6">Are you sure you want to delete the selected items?</p>
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
          <button onClick={() => setShowConfirm(false)} className="absolute top-2 right-2">
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>
          <CheckCircle className="text-red-600 " size={24} />
          <div className="text-sm font-medium text-red-600">Deleted successfully!</div>
        </div>
        </div>
      )}

    {showExportSuccess && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
          <button onClick={() => setShowExportSuccess(false)} className="absolute top-2 right-2">
            <X className="text-gray-500 hover:text-gray-700" size={20} />
          </button>

          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500" size={48} />
            <h3 className="text-xl font-semibold mt-4 mb-2">Export Successful</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              The customer list has been exported successfully.
            </p>

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
};

export default AdminCustomers;
