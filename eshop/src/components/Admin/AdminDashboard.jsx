import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Settings } from "lucide-react";
import WhiteTshirt from "../../assets/adminProductImg/whiteTsrt.png"
import redTshirt from "../../assets/adminProductImg/red-tshirt.png"
import menHoodie from "../../assets/adminProductImg/men-hoodie.png"
import whiteBlackTshirt from "../../assets/adminProductImg/white-black-striped.png"
import whiteWomenTshirt from "../../assets/adminProductImg/white-women-tshirt.png"
import chart1 from "../../assets/admin/chartYellow.png"
import chart2 from "../../assets/admin/chartGreen.png"
import chart3 from "../../assets/admin/chartBlue.png"


const StatCard = ({ title, value, growth, image }) => (
  <div className="p-3 rounded-2xl shadow bg-white flex items-center space-x-8">
      
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
        <p className={`text-sm ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {growth >= 0 ? '+' : ''}{growth}%
        </p>
      </div>
      {image && <img src={image} alt={title} className="w-16 h-10 object-cover" />}
    </div>
);

const OrdersChart = () => {
  const data = [
    { name: "4am", May21: 10, May22: 12 },
    { name: "5am", May21: 14, May22: 18 },
    { name: "6am", May21: 20, May22: 25 },
    { name: "7am", May21: 28, May22: 30 },
    { name: "8am", May21: 30, May22: 34 },
    { name: "9am", May21: 45, May22: 38 },
    { name: "10am", May21: 42, May22: 20 },
    { name: "11am", May21: 30, May22: 22 },
    { name: "12pm", May21: 28, May22: 26 },
    { name: "1pm", May21: 35, May22: 30 },
    { name: "2pm", May21: 38, May22: 36 },
    { name: "3pm", May21: 42, May22: 32 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="May21" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="May22" stroke="#1f77b4" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const BarStats = () => {
  const data = [
    { day: "13", value: 1000 },
    { day: "14", value: 1300 },
    { day: "15", value: 2525 },
    { day: "16", value: 1900 },
    { day: "17", value: 2100 },
    { day: "18", value: 1721 },
  ];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const RecentTransactions = () => (
  <div className="bg-white rounded-2xl shadow p-4  overflow-x-auto">
    <div className="text-lg font-semibold mb-4">Recent Transactions</div>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Name</th>
          <th className="py-2">Date</th>
          <th className="py-2">Amount</th>
          <th className="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: "Jagarnath S.", date: "24.05.2023", amount: "$124.97", status: "Paid" },
          { name: "Anand G.", date: "23.05.2023", amount: "$55.42", status: "Pending" },
          { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
          { name: "Rakesh S.", date: "22.05.2023", amount: "$144.94", status: "Pending" },
          { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
        ].map((tx, idx) => (
          <tr key={idx} className="border-b ">
            <td className="py-4">{tx.name}</td>
            <td className="py-4">{tx.date}</td>
            <td className="py-4">{tx.amount}</td>
            <td className="py-4">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{tx.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TopProducts = () => (
  <div className="bg-white rounded-2xl shadow p-4">
    <div className="text-lg font-semibold mb-4">Top Products by Units Sold</div>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Name</th>
          <th className="py-2">Price</th>
          <th className="py-2">Units Sold</th>
        </tr>
      </thead>
      <tbody>
        {[
          { image: menHoodie, name: "Men Grey Hoodie", price: "$49.90", sold: 204 },
          { image: whiteWomenTshirt, name: "Women Striped T-Shirt", price: "$34.90", sold: 155 },
          { image: WhiteTshirt, name: "Wome White T-Shirt", price: "$40.90", sold: 120 },
          { image: whiteBlackTshirt,  name: "Men White T-Shirt", price: "$49.90", sold: 204 },
          {image: redTshirt,  name: "Women Red T-Shirt", price: "$34.90", sold: 155 },
        ].map((item, idx) => (
          <tr key={idx} className="border-b">
            <td className="px-4 py-2 flex items-center gap-2">
            <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                  />
            <div className="font-medium">{item.name}</div>
                  
              </td>
            <td className="py-2">{item.price}</td>
            <td className="py-2">{item.sold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = () => {
    // const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex">
      
      <div className="p-6 w-full min-h-screen space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-full shadow hover:bg-red-100">
            <Settings size={18} /> Manage
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Total Revenue" value="$10.54" growth={22.45} />
          <StatCard title="Orders" value="1,056" growth={15.34} />
          <StatCard title="Unique Visits" value="5,420" growth={-10.24} image={chart1}/>
          <StatCard title="New Users" value="1,650" growth={15.34} image={chart2} />
          <StatCard title="Existing Users" value="9,653" growth={22.45} image={chart3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
            <div className="text-lg font-semibold mb-4">Orders Over Time</div>
            <OrdersChart />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="text-lg font-semibold mb-4">Last 7 Days Sales</div>
            <div className="text-sm mb-2">1,259 Items Sold</div>
            <div className="text-xl font-bold mb-4">$12,546 Revenue</div>
            <BarStats />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentTransactions />
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
