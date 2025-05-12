"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/app/components/pagination";

const leaves = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "Annual Leave" : "Personal Leave",
  fromTo: `1${i}th Jan - 1${i + 2}th Jan`,
  days: `${(i % 3) + 1} Day${(i % 3) + 1 > 1 ? "s" : ""}`,
  reason: "Reason " + (i + 1),
  status: ["Approved", "Pending", "Rejected"][i % 3],
}));

export default function EmployeeLeavePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const currentLeaves = leaves.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Employee Leave Records
        </h1>
        <Link href="/employee/1/leaves/new/apply">
          <button className="rounded bg-black px-4 py-2 text-white cursor-pointer">
            Apply for Leave
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {["Type", "From - To", "Days", "Reason", "Status"].map(
                (header) => (
                  <th key={header} className="px-4 py-2">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentLeaves.map((leave) => (
              <tr key={leave.id} className="border-t">
                <td className="px-4 py-3">{leave.type}</td>
                <td className="px-4 py-3">{leave.fromTo}</td>
                <td className="px-4 py-3">{leave.days}</td>
                <td className="px-4 py-3">{leave.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded p-2 text-xs font-semibold ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : leave.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={leaves.length}
        limit={limit}
        onPageChange={setCurrentPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
