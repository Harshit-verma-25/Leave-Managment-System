"use server";

import { db } from "@/app/firebase";
import { LeaveHistoryProps } from "@/app/types/leaves";
import { doc, updateDoc } from "firebase/firestore";

export async function updateLeave(
  employeeID: string,
  leaveID: string,
  data: LeaveHistoryProps
): Promise<{
  status: number;
  message: string;
  error?: any;
}> {
  try {
    const leaveRef = doc(db, "leaves", employeeID);

    // Convert nested object into dot-notation update object
    const updates: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (key === "id") continue;

      updates[`${leaveID}.${key}`] = value;
    }

    await updateDoc(leaveRef, updates);

    return {
      status: 200,
      message: "Leave application updated successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error updating leave application",
      error,
    };
  }
}
