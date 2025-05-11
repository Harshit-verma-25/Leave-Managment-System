"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEAVE_TYPES, LeaveType } from "@/app/types/leaves";

export default function NewLeaveRequest() {
  const router = useRouter();
  const [leaveType, setLeaveType] = useState<LeaveType>("CL");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !reason) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Request submitted");

      setIsSubmitting(false);
      router.push("/employee/1/leaves");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] lg:p-6 p-4">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Leave Application
          </h1>
          <p className="text-gray-600">
            Please fill out the form below to apply for leave. Ensure all
            details are accurate before submitting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as LeaveType)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(LEAVE_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="block font-semibold text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block font-semibold text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block font-semibold text-gray-700 mb-1"
            >
              Reason for Leave
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Enter your reason for leave"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-white bg-red-600 hover:bg-red-700 font-semibold px-6 py-2 rounded-md transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold px-6 py-2 rounded-md transition duration-200`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
