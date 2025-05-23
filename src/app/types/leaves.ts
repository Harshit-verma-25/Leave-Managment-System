export type LeaveType = "CL" | "SL" | "PL";

export const LEAVE_TYPES = {
  CL: "Casual Leave",
  SL: "Sick Leave",
  PL: "Personal Leave",
};

export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LeaveRequest {
  id: string;
  name: string;
  image: string | null;
  leaveType: LeaveType;
  leave: string;
  fromTo: string;
  days: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
}

export interface ApplyLeaveProps {
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
