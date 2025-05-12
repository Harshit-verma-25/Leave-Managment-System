"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Simulated fetch — replace with actual data fetching logic if needed
    setEmployeeCount(42);
    setLeaveRequests(68);
    setPendingLeaves(12);
    setActiveUsers(38);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500 mb-2">Total Employees</h2>
          <p className="text-2xl font-bold">{employeeCount}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500 mb-2">Total Leave Requests</h2>
          <p className="text-2xl font-bold">{leaveRequests}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500 mb-2">Pending Approvals</h2>
          <p className="text-2xl font-bold">{pendingLeaves}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500 mb-2">Active Users</h2>
          <p className="text-2xl font-bold">{activeUsers}</p>
        </div>
      </div>

      {/* Placeholder for charts or reports */}
      <div className="bg-white rounded-lg shadow p-6 border">
        <h2 className="text-lg font-semibold mb-4">Monthly Leave Overview</h2>
        <div className="h-40 flex items-center justify-center text-gray-400">
          {/* Replace this with actual chart or graph later */}
          <span>Chart/Graph Coming Soon...</span>
        </div>
      </div>
    </div>
  );
}
