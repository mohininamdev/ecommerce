import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const AdminAddCustomer = () => {
    const navigate = useNavigate();
  return (
    <div className="p-6 w-full bg-gray-50">
        <button
            onClick={() => navigate(-1)}
            className="flex items-center text-red-600 hover:text-red-800 mb-4"
            >
            <FiArrowLeft className="mr-2" />
            Back
        </button>
            
        {/* Header with Title and Buttons */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Add Customer</h1>
            <div className="space-x-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Cancel</button>
            <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">Save</button>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
            {/* Customer Information */}
            <div>
            <h2 className="text-lg font-semibold mb-1">Customer Information</h2>
            <p className="text-sm text-gray-500 mb-4">Most important information about the customer</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
            </div>
            </div>

            {/* Customer Address */}
            <div>
            <h2 className="text-lg font-semibold mb-1">Customer Address</h2>
            <p className="text-sm text-gray-500 mb-4">Shipping address information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Apartment</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select className="border rounded px-4 py-2 w-full">
                    <option>Choose</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Germany</option>
                    <option>India</option>
                    </select>
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="text" className="border rounded px-4 py-2 w-full" />
                </div>
            </div>
            </div>

            {/* Customer Notes */}
            <div>
            <h2 className="text-lg font-semibold mb-1">Customer Notes</h2>
            <p className="text-sm text-gray-500 mb-2">Add notes about customer</p>
            <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                rows="4"
                className="border rounded px-4 py-2 w-full"
                placeholder="Add notes about customer"
                ></textarea>
            </div>
            </div>
        </div>
    </div>
  
  );
};

export default AdminAddCustomer;
