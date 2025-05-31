export type LeaveType = "CL" | "SL" | "PL";

export const LEAVE_TYPES = {
  CL: "Casual Leave",
  SL: "Sick Leave",
  PL: "Personal Leave",
};

export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ApplyLeaveProps {
  staffID: string;
  leaveType: LeaveType | "";
  leave: string;
  startDate: string | null;
  endDate: string | null;
  noOfDays: number;
  addressDuringLeave: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  delegatedTo: string;
  reason: string;
  appliedOn: string;
  status: LeaveStatus;
}

export interface ApprovalStatus {
  id: string;
  name: string;
  comment: string;
  status: LeaveStatus;
  approvedOn: string;
  designation: string;
}

export interface LeaveHistoryProps extends ApplyLeaveProps {
  id: string;
  name: string;
  attachment: string | null;
  approvalStatus: ApprovalStatus[];
  currentApprover: string;
}
export interface ApprovalHierarchy {
  leaveRequestId: string;
  steps: ApprovalStatus[];
  currentStep: number;
}
