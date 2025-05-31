"use server";

import { db } from "@/app/firebase";
import { LeaveHistoryProps } from "@/app/types/leaves";
import { doc, getDoc } from "firebase/firestore";

export async function getSingleLeave(
  leaveID: string
): Promise<{
  status: number;
  data?: LeaveHistoryProps;
  message: string;
  error?: any;
}> {
  try {
    const leaveRef = doc(db, "leaves", leaveID);
    const leaveDoc = await getDoc(leaveRef);

    if (!leaveDoc.exists()) {
      return {
        status: 404,
        message: "No leave applications found for this employee",
      };
    }

    const leaveData = leaveDoc.data();

    if (!leaveData) {
      return {
        status: 404,
        message: "Leave application not found",
      };
    }

    return {
      status: 200,
      data: { id: leaveID, ...leaveData } as LeaveHistoryProps,
      message: "Leave application fetched successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching leave application",
      error,
    };
  }
}
