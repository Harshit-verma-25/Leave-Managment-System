export type UserRole = "admin" | "manager" | "employee";

export interface SingleStaffData {
  profile: File | null | string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNo: string;
  designation: string;
  assignedUnder: string;
  role: string;
}

export interface StaffData extends SingleStaffData {
  staffID: string;
  id: string;
  email: string;
  joiningDate: string;
}
