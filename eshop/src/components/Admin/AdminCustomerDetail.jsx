import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const customers = [

  { id: 1, name: 'Rakesh Mishra', location: 'Sawaynchester', orders: 5, spent: 96.14, email: "rakeshmishra@gmail.com", phone: "+91 8804789761", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 2, name: 'Lakshman Singh', location: 'Kaydenville', orders: 12, spent: 22.18, email: "lakshamnsingh@gmail.com", phone: "+91 8804789762", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 3, name: 'Dinanath Sah', location: 'East Freidaton', orders: 6, spent: 59.64, email: "dinanath@gmail.com", phone: "+91 8804789763", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 4, name: 'Anmol Yadav', location: 'South Marcellus', orders: 3, spent: 54.52, email: "anmol@gmail.com", phone: "+91 8804789764", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 5, name: 'Roushan Singh Rajput', location: 'South Olestad', orders: 15, spent: 45.80 , email: "roushan@gmail.com", phone: "+91 8804789765", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 6, name: 'Lokesh Rahul', location: 'Dereckberg', orders: 12, spent: 85.78, email: "lokesh@gmail.com", phone: "+91 8804789766", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 7, name: 'Randhir Kumar', location: 'Franeckview', orders: 5, spent: 128.66, email: "randhirppl@gmail.com", phone: "+91 8804789767", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 8, name: 'Khushi Kumari', location: 'Port Kathryne', orders: 7, spent: 113.39, email: "khushi@gmail.com", phone: "+91 8804789768", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 9, name: 'Pooja kumari', location: 'McGlynntown', orders: 14, spent: 80.80, email: "pooja@gmail.com", phone: "+91 8804789769", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 10, name: 'Ruhi Kumari', location: 'Krystalview', orders: 5, spent: 42.03, email: "ruhi@gmail.com", phone: "+91 8804789760", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 11, name: 'Ravi Patel', location: 'Newdale', orders: 10, spent: 78.99, email: "ravi@gmail.com", phone: "+91 8804789712", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 12, name: 'Sneha Agarwal', location: 'Westwood', orders: 8, spent: 98.45, email: "sneha@gmail.com", phone: "+91 8804789713", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 13, name: 'Amit Sharma', location: 'Holloway', orders: 4, spent: 65.23, email: "amit@gmail.com", phone: "+91 8804789714", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 14, name: 'Priya Mehta', location: 'Lakeville', orders: 9, spent: 110.50 , email: "priya@gmail.com", phone: "+91 8804789715", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 15, name: 'Vikram Joshi', location: 'Hilltown', orders: 7, spent: 91.75, email: "vikram@gmail.com", phone: "+91 8804789716", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 16, name: 'Nisha Verma', location: 'Crestview', orders: 6, spent: 58.30, email: "nisha@gmail.com", phone: "+91 88047897617", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 17, name: 'Saurabh Tiwari', location: 'Brookline', orders: 3, spent: 49.60 , email: "saurabh@gmail.com", phone: "+91 8804789718", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 18, name: 'Meena Kumari', location: 'Fairmont', orders: 11, spent: 119.00, email: "meena@gmail.com", phone: "+91 8804789719", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 19, name: 'Karan Malhotra', location: 'Elmwood', orders: 2, spent: 33.40 , email: "karan@gmail.com", phone: "+91 88047897620", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 20, name: 'Divya Rai', location: 'Norwick', orders: 5, spent: 60.00, email: "divya@gmail.com", phone: "+91 8804789721", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 21, name: 'Neha Singh', location: 'Lakeside', orders: 8, spent: 105.75, email: "neha@gmail.com", phone: "+91 8804789722", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 22, name: 'Gaurav Bansal', location: 'Greenfield', orders: 9, spent: 99.99, email: "gaurav@gmail.com", phone: "+91 8804789723", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 23, name: 'Aarav Kapoor', location: 'Riverview', orders: 10, spent: 120.45, email: "aarav@gmail.com", phone: "+91 8804789724", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
  { id: 24, name: 'Anjali Yadav', location: 'Silverlake', orders: 6, spent: 88.88, email: "anjali@gmail.com", phone: "+91 8867547892 ", address: "Panapur langa, Hajipur, vaishali, 844124", tags: ["Vip Customer", "Europe"], notes: "" },
];

const CustomerDetails = () => {
  
  const navigate = useNavigate();

  const { id } = useParams();
  const customer = customers.find(c => c.id === parseInt(id));
  if (!customer) 
    return 
    <div>Customer not found</div>;

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-red-600">&larr; Back</button>

      <h1 className="text-2xl font-semibold">Customer Information</h1>

      {/* Top section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 bg-white shadow rounded p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{customer.name}</h2>
              <p className="text-sm text-gray-600">{customer.location}</p>
              <p className="text-sm text-gray-600">{customer.orders} Orders</p>
              <p className="text-sm text-gray-600">Customer for 2 years</p>
              <div className=" mt-1">⭐⭐⭐⭐</div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <h3 className="font-semibold mb-1">Customer Notes</h3>
            <textarea placeholder="Add notes about customer" className="w-full p-2 border rounded text-sm" rows={3} defaultValue={customer.notes}></textarea>
          </div>
        </div>

        {/* Overview Section */}
        <div className="w-full md:w-1/3 bg-white shadow rounded p-6 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Overview</h3>
            <button className="text-sm text-rede-600">Edit</button>
          </div>
          <p className="text-sm text-gray-600">{customer.address}</p>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <p className="text-sm text-gray-600">{customer.phone}</p>
          <button className="text-sm text-red-600 mt-4">Delete Customer</button>
        </div>

        {/* Tags */}
        <div className="w-full md:w-1/3 bg-white shadow rounded p-6">
          <h3 className="font-semibold mb-2">Tags</h3>
          <input className="border p-2 w-full text-sm rounded mb-2" placeholder="Enter tag name" />
          <div className="flex gap-2 flex-wrap">
            {customer.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Orders</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 bg-gray-50">
            <tr>
              <th className="p-2">Order</th>
              <th className="p-2">Date</th>
              <th className="p-2">Order Status</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Mock orders */}
            {[
              { id: '#23534D', date: 'May 25, 3:12 PM', status: 'Pending', price: 29.74 },
              { id: '#12512B', date: 'May 10, 2:00 PM', status: 'Completed', price: 23.06 },
              { id: '#23534D', date: 'April 18, 8:00 AM', status: 'Completed', price: 29.74 },
              { id: '#76543E', date: 'April 12, 8:00 AM', status: 'Completed', price: 23.06 },
              { id: '#51323C', date: 'April 10, 4:12 PM', status: 'Completed', price: 23.06 }
            ].map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-2">${order.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save & Cancel Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button className="px-4 py-2 border rounded hover:bg-red-400 text-gray-600">Cancel</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Save</button>
      </div>
    </div>
  );
};

export default CustomerDetails;
