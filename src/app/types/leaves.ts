export type LeaveType = "CL" | "SL" | "EL" | "ML" | "PL" | "AL";

export const LEAVE_TYPES = {
  CL: "Casual Leave",
  SL: "Sick Leave",
  EL: "Earned Leave",
  ML: "Maternity Leave",
  PL: "Personal Leave",
  AL: "Annual Leave",
};

export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LeaveRequest = {
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
};
