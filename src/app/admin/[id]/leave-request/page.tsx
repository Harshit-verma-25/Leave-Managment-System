"use client";
import { useEffect, useState } from "react";
import { LEAVE_TYPES, LeaveHistoryProps } from "@/app/types/leaves";
import { getLeavesForApprover } from "@/app/actions/leave/getLeaveForApprover";
import { useParams } from "next/navigation";
import formatDate from "@/app/components/formatDate";
import LeaveReviewModal from "@/app/components/leave-review";
import { getLeaveByApprover } from "@/app/actions/leave/getLeaveByApprover";

export default function LeaveRequestPage() {
  const { id: adminId } = useParams() as { id: string };
  const [selectedTab, setSelectedTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [leaveRequests, setLeaveRequests] = useState<LeaveHistoryProps[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState<LeaveHistoryProps | null>(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const [pendingRes, historyRes] = await Promise.all([
          getLeavesForApprover(adminId),
          getLeaveByApprover(adminId),
        ]);

        const pending = pendingRes.status === 200 ? pendingRes.data : [];
        const history = historyRes.status === 200 ? historyRes.data : [];

        // Remove duplicates by leave ID
        const uniqueMap = new Map();

        [...pending, ...history].forEach((leave: any) => {
          uniqueMap.set(leave.id, leave);
        });

        const combinedLeaves = Array.from(uniqueMap.values());

        setLeaveRequests(combinedLeaves);
      } catch (err) {
        console.error("Failed to fetch leave requests:", err);
      }
    };

    fetchLeaveRequests();
  }, [adminId]);

  const filteredRequests = leaveRequests.filter(
    (r) => r.status === selectedTab
  );

  return (
    <>
      {selectedRequest && (
        <LeaveReviewModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          leaveData={selectedRequest}
          approverId={adminId}
          selectedTab={selectedTab}
        />
      )}

      <div className="min-h-screen bg-[#f8f9fa] p-6">
        <h1 className="text-3xl font-bold text-gray-900">Leave Approvals</h1>

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
                    {LEAVE_TYPES[req.leaveType as keyof typeof LEAVE_TYPES] ??
                      req.leaveType}
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
                  <strong>From:</strong> {formatDate(req.startDate || "")}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>To:</strong> {formatDate(req.endDate || "")}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>No. of Days:</strong> {req.noOfDays}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right flex flex-col items-end justify-between">
                <p className="text-sm text-gray-500 mb-2">
                  Applied on {formatDate(req.appliedOn || "")}
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
    </>
  );
}
