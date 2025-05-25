"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { LeaveHistoryProps } from "@/app/types/leaves";
import formatDate from "@/app/components/formatDate";
import { useState } from "react";
import { updateLeaveFromApprover } from "../actions/leave/updateLeaveFromApprover";

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveData: LeaveHistoryProps;
  approverId: string;
  selectedTab: "PENDING" | "APPROVED" | "REJECTED";
}

export default function LeaveReviewModal({
  isOpen,
  onClose,
  leaveData,
  approverId,
  selectedTab,
}: LeaveReviewModalProps) {
  if (!isOpen || !leaveData) return null;

  console.log(leaveData);
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async (status: "APPROVED" | "REJECTED") => {
    const response = await updateLeaveFromApprover(
      leaveData.id,
      approverId,
      status,
      new Date().toISOString(),
      comment
    );

    if (response.status === 200) {
      console.log("Leave updated successfully");
      onClose();
    } else {
      console.error("Failed to update leave:", response.message);
    }
  };

  return (
    <>
      {commentModal && (
        <div className="fixed inset-0 z-60 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-[#f8f9fa] rounded-xl shadow-xl p-4 relative min-w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Add a comment?</h2>
              <button
                className="text-black font-bold cursor-pointer"
                onClick={() => setCommentModal(false)}
              >
                <X />
              </button>
            </div>

            <textarea
              className="w-full mt-4 p-2 border rounded-md"
              placeholder="Add your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={200}
            ></textarea>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setCommentModal(false);
                  handleSubmit("REJECTED");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-4 relative min-w-[60vw] max-w-2xl">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Leave Request Details</h2>
            <button
              className="text-black font-bold cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              <span className="underline">Leave Details</span>:
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
              {/* Leave Type */}
              <p>
                <strong className="mr-2">Leave Type:</strong>
                <span>{leaveData.leave}</span>
              </p>

              <p>
                <strong className="mr-2">Employee Name:</strong>
                <span>{leaveData.name}</span>
              </p>

              <p>
                <strong className="mr-2">Start Date:</strong>
                <span>{formatDate(leaveData.startDate || "")}</span>
              </p>

              <p>
                <strong className="mr-2">End Date:</strong>
                <span>{formatDate(leaveData.endDate || "")}</span>
              </p>

              <p>
                <strong className="mr-2">No. of Days:</strong>
                <span>{leaveData.noOfDays}</span>
              </p>

              <p>
                <strong className="mr-2">Applied On:</strong>
                <span>{formatDate(leaveData.appliedOn || "")}</span>
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-4 text-sm text-gray-700">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              <span className="underline">Contact Details</span>:
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
              <p>
                <strong className="mr-2">Address During Leave:</strong>
                <span>{leaveData.addressDuringLeave}</span>
              </p>

              <p>
                <strong className="mr-2">Emergency Contact:</strong>
                <span>
                  {leaveData.emergencyContactName} -{" "}
                  {leaveData.emergencyContactNumber}
                </span>
              </p>
            </div>
          </div>

          {/* Reason and Delegation */}
          <div className="mt-4 text-sm text-gray-700">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              <span className="underline">Delegation of Duties</span>:
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
              <p>
                <strong className="mr-2">Delegated To:</strong>
                <span>{leaveData.delegatedTo}</span>
              </p>

              <p>
                <strong className="mr-2">Reason:</strong>
                <span>{leaveData.reason}</span>
              </p>
            </div>
          </div>

          {/* Attachment Section */}
          <div className="mt-4 text-sm text-gray-700">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              <span className="underline">Attachment (if any)</span>:
            </h2>
            {leaveData.attachment ? (
              <div className="flex items-center">
                {leaveData.attachment.endsWith(".pdf") ? (
                  <a
                    href={leaveData.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Attachment
                  </a>
                ) : (
                  <Image
                    src={leaveData.attachment}
                    alt="Leave Attachment"
                    width={9999}
                    height={9999}
                    className="h-14 w-14 object-cover rounded-md"
                  />
                )}
              </div>
            ) : (
              <p className="text-gray-500">No attachment provided.</p>
            )}
          </div>

          {selectedTab === "PENDING" && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  handleSubmit("APPROVED");
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => setCommentModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md cursor-pointer"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
