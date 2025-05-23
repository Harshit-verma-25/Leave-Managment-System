"use client";
import { useEffect, useState } from "react";
import { LogOutIcon, X } from "lucide-react";
import Link from "next/link";
import data from "@/app/data.json";
import { LEAVE_TYPES, LeaveRequest } from "@/app/types/leaves";

export default function ManagerDashboard() {
  const [selectedTab, setSelectedTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(
    null
  );

  useEffect(() => {
    // Load data from imported JSON
    setLeaveRequests(data as LeaveRequest[]);
  }, []);

  const handleDecision = (id: string, decision: "APPROVED" | "REJECTED") => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: decision } : req))
    );
  };

  const filteredRequests = leaveRequests.filter(
    (r) => r.status === selectedTab
  );

  return (
    <>
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 min-w-96">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-semibold">Leave Request Details</h2>
              <button
                className="text-black font-bold cursor-pointer"
                onClick={() => {
                  setModalOpen(false);
                  setSelectedRequest(null);
                }}
              >
                <X />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <input
                    type="text"
                    value={LEAVE_TYPES[selectedRequest.leaveType]}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={selectedRequest.name}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={selectedRequest.fromTo}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    No. of Days
                  </label>
                  <input
                    type="text"
                    value={selectedRequest.days}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  value={selectedRequest.reason}
                  rows={4}
                  placeholder="Enter your reason for leave"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled
                />
              </div>

              <p className="mb-6">
                <strong>Status:</strong>{" "}
                <span
                  className={`p-2 rounded-3xl font-semibold text-sm border border-gray-300 ${
                    selectedRequest.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedRequest.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedRequest.status.charAt(0) +
                    selectedRequest.status.slice(1).toLowerCase()}
                </span>
              </p>

              {selectedRequest.status === "PENDING" && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      handleDecision(selectedRequest.id, "APPROVED");
                      setModalOpen(false);
                      setSelectedRequest(null);
                    }}
                    className="text-white bg-green-600 hover:bg-green-700 font-semibold px-6 py-2 rounded-md transition duration-200 cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleDecision(selectedRequest.id, "REJECTED");
                      setModalOpen(false);
                      setSelectedRequest(null);
                    }}
                    className="text-white bg-red-600 hover:bg-red-700 font-semibold px-6 py-2 rounded-md transition duration-200 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}

              {selectedRequest.status !== "PENDING" && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedRequest(null);
                    }}
                    className="text-white bg-gray-600 hover:bg-gray-700 font-semibold px-6 py-2 rounded-md transition duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen lg:p-6 p-4">
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>

        <div className="rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-1">Leave Requests</h2>
          <p className="text-sm text-gray-500 mb-4">
            Manage leave requests from your team members
          </p>

          {/* Tabs */}
          <div className="flex space-x-3 mb-6">
            {(["PENDING", "APPROVED", "REJECTED"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedTab(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium border   cursor-pointer ${
                  selectedTab === status
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()} (
                {leaveRequests.filter((r) => r.status === status).length})
              </button>
            ))}
          </div>

          {/* Leave Cards */}
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">
                      {LEAVE_TYPES[req.leaveType]}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-3xl font-semibold text-sm border border-gray-300 ${
                        req.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Employee:</strong> {req.name}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Duration:</strong> {req.fromTo}
                  </p>
                  {/* <p className="text-sm text-gray-700">
                  <strong>Reason:</strong> {req.reason}
                </p> */}
                </div>
                <div className="mt-4 md:mt-0 text-right flex flex-col items-end justify-between">
                  <p className="text-sm text-gray-500 mb-2">
                    Applied on {req.appliedOn}
                  </p>

                  <button
                    className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                      setSelectedRequest(req);
                      setModalOpen(true);
                    }}
                  >
                    {selectedTab === "PENDING" ? "Review" : "View Details"}
                  </button>

                  {/* {req.status === "PENDING" && (
                  <div className="space-x-2">
                    <button
                      className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 rounded-md"
                      onClick={() => handleDecision(req.id, "APPROVED")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-100 text-red-800 hover:bg-red-200 py-2 px-4 rounded-md"
                      onClick={() => handleDecision(req.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </div>
                )} */}
                </div>
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <p className="text-sm text-gray-500">
                No requests in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
