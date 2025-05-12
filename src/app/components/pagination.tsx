"use client";

import { PaginationProps } from "@/app/types/pagination";

export default function Pagination({
  currentPage,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm text-gray-600">
      <div>
        Showing{" "}
        <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(currentPage * limit, totalItems)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> leaves
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm text-gray-700">
          Show:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            onLimitChange(parseInt(e.target.value));
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
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
