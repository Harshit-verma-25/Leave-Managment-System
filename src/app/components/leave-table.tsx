import { useEffect, useState } from "react";
import Link from "next/link";
import { LEAVE_TYPES, LeaveHistoryProps } from "@/app/types/leaves";
import { useParams } from "next/navigation";
import { getAllLeave } from "@/app/actions/leave/getAllLeave";
import formatDate from "@/app/components/formatDate";

export const LeaveTable = ({ role }: { role: string }) => {
  const { id } = useParams() as { id: string };

  const [selectedTab, setSelectedTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");

  const [data, setData] = useState<LeaveHistoryProps[] | null>(null);

  useEffect(() => {
    // Fetch leave requests from the server
    const fetchLeaveRequests = async () => {
      try {
        const response = await getAllLeave(id);
        if (response.status !== 200) {
          throw new Error("Failed to fetch leave requests");
        }

        setData(response.data as LeaveHistoryProps[]);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, [id]);

  console.log("Leave Requests Data:", data);

  const filteredRequests = data && data.filter((r) => r.status === selectedTab);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leave Records</h1>
        <Link href={`/${role}/${id}/leaves/new/create`}>
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
            {data ? data.filter((r) => r.status === status).length : 0})
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
                  <strong>Start Date: </strong> {formatDate(req.startDate)}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>End Date: </strong> {formatDate(req.endDate)}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Number of Days: </strong> {req.noOfDays}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right flex flex-col items-end justify-between">
                <p className="text-sm text-gray-500 mb-2">
                  Applied on {formatDate(req.appliedOn)}
                </p>

                {selectedTab === "PENDING" ? (
                  <div className="flex items-center gap-2">
                    <Link href={`/${role}/${id}/leaves/${req.id}/edit`}>
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
                    <Link href={`/${role}/${id}/leaves/${req.id}/view`}>
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
};
