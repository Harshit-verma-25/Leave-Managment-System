"use client";

import { useState } from "react";
import Link from "next/link";

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

  const totalPages = Math.ceil(leaves.length / limit);

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
                    className={`rounded px-2 py-1 text-xs font-semibold ${
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 text-sm text-gray-600">
        <div>
          Showing{" "}
          <span className="font-medium">{(currentPage - 1) * limit + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * limit, leaves.length)}
          </span>{" "}
          of <span className="font-medium">{leaves.length}</span> leaves
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-gray-700">
            Show:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setCurrentPage(1); // reset to first page on limit change
            }}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
          >
            {[10, 20, 50].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
