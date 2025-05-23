"use client";

import { useState } from "react";
import Link from "next/link";
import { ApplyLeaveProps, LEAVE_TYPES } from "@/app/types/leaves";

interface LeaveRequest extends ApplyLeaveProps {
  id: string;
  attachment: string | null;
}

export default function EmployeeLeavePage() {
  const [selectedTab, setSelectedTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");

  const [data, setData] = useState<LeaveRequest[] | null>([
    {
      id: "1",
      attachment: null,
      leaveType: "CL",
      leave: "Casual Leave",
      noOfDays: 2,
      startDate: "2023-09-20",
      endDate: "2023-09-22",
      addressDuringLeave: "123 Main St, City",
      emergencyContactName: "John Doe",
      emergencyContactNumber: "1234567890",
      delegatedTo: "Jane Smith",
      reason: "Family function",
      status: "PENDING",
      appliedOn: "2023-09-20",
    },
    {
      id: "2",
      attachment: null,
      leaveType: "SL",
      leave: "Sick Leave",
      noOfDays: 3,
      startDate: "2023-09-25",
      endDate: "2023-09-28",
      addressDuringLeave: "456 Elm St, City",
      emergencyContactName: "Alice Johnson",
      emergencyContactNumber: "9876543210",
      delegatedTo: "Bob Brown",
      reason: "Fever",
      status: "APPROVED",
      appliedOn: "2023-09-25",
    },
    {
      id: "3",
      attachment: null,
      leaveType: "PL",
      leave: "Personal Leave",
      noOfDays: 1,
      startDate: "2023-09-30",
      endDate: "2023-10-01",
      addressDuringLeave: "789 Oak St, City",
      emergencyContactName: "Charlie Green",
      emergencyContactNumber: "4567891230",
      delegatedTo: "David White",
      reason: "Personal reasons",
      status: "REJECTED",
      appliedOn: "2023-09-30",
    },
    {
      id: "4",
      attachment: null,
      leaveType: "CL",
      leave: "Casual Leave",
      noOfDays: 5,
      startDate: "2023-10-05",
      endDate: "2023-10-10",
      addressDuringLeave: "321 Pine St, City",
      emergencyContactName: "Eve Black",
      emergencyContactNumber: "3216549870",
      delegatedTo: "Frank Gray",
      reason: "Vacation",
      status: "PENDING",
      appliedOn: "2023-10-05",
    },
    {
      id: "5",
      attachment: null,
      leaveType: "SL",
      leave: "Sick Leave",
      noOfDays: 2,
      startDate: "2023-10-12",
      endDate: "2023-10-14",
      addressDuringLeave: "654 Maple St, City",
      emergencyContactName: "Grace Blue",
      emergencyContactNumber: "7891234560",
      delegatedTo: "Hank Yellow",
      reason: "Flu",
      status: "APPROVED",
      appliedOn: "2023-10-12",
    },
  ]);

  const filteredRequests = data && data.filter((r) => r.status === selectedTab);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leave Records</h1>
        <Link href="/employee/1/leaves/new/apply">
          <button className="rounded bg-black px-4 py-2 text-white cursor-pointer">
            Apply for Leave
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        {(["PENDING", "APPROVED", "REJECTED"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedTab(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium border cursor-pointer ${
              selectedTab === status
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()} (
            {data && data.filter((r) => r.status === status).length})
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div className="space-y-4">
        {filteredRequests &&
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="border rounded-lg p-4 flex flex-col md:flex-row justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    {LEAVE_TYPES[req.leaveType as keyof typeof LEAVE_TYPES]}
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
                  <strong>Start Date: </strong> {req.startDate}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>End Date: </strong> {req.endDate}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Number of Days: </strong> {req.noOfDays}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right flex flex-col items-end justify-between">
                <p className="text-sm text-gray-500 mb-2">
                  Applied on {req.appliedOn}
                </p>

                {selectedTab === "PENDING" ? (
                  <div className="flex items-center gap-2">
                    <Link href={`/employee/1/leaves/${req.id}/edit`}>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md cursor-pointer"
                      onClick={() => {
                        // handleDecision(req.id, "REJECTED");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href={`/employee/1/leaves/${req.id}/view`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

        {filteredRequests && filteredRequests.length === 0 && (
          <p className="text-sm text-gray-500">No requests in this category.</p>
        )}
      </div>
    </div>
  );
}
