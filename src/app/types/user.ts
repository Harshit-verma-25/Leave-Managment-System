export type UserRole = "admin" | "manager" | "employee";
interface ApprovalStatus {
  [approverID: string]: "PENDING" | "APPROVED" | "REJECTED";
}

interface ReportingAuthority {
  id: string;
  name: string;
}

export interface SingleStaffData {
  profile: File | null | string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNo: string;
  designation: string;
  assignedUnder: string;
  role: string;
  reportingAuthority: ReportingAuthority[];
}

export interface StaffData extends SingleStaffData {
  staffID: string;
  id: string;
  email: string;
  joiningDate: string;
  approvalStatus: ApprovalStatus;
  currentApprover: string;
}
