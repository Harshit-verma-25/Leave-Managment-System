"use server";

import { db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import { SingleStaffData } from "@/app/types/user";
import { join } from "path";

export async function createStaff(
  userId: string,
  staffID: string,
  email: string,
  data: SingleStaffData
) {
  try {
    await setDoc(doc(db, "users", userId), {
      id: userId,
      staffID,
      email,
      profile: data.profile,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      phoneNo: data.phoneNo,
      designation: data.designation,
      assignedUnder: data.assignedUnder,
      role: data.role.toLowerCase(),
      joiningDate: new Date().toISOString(),
    }).then(() => {
      return {
        message: "Staff created successfully",
        status: 200,
      };
    });
  } catch (error) {
    console.error("Error setting staff document:", error);
    throw new Error("Failed to create staff record.");
  }
}
