export type UserRole = "admin" | "manager" | "employee";

export interface StaffData {
  profile: File | null;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNo: string;
  designation: string;
  assignedUnder: string[];
  role: string;
  [key: string]: string | string[] | File | null;
}
