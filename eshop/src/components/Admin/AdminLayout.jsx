import { Outlet } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import { useState } from 'react';

export default function AdminLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main className={`${isExpanded ? 'ml-64' : 'ml-16'} transition-all duration-300 p-6 w-full bg-gray-50`}>
        <Outlet />
      </main>
    </div>
  );
}
