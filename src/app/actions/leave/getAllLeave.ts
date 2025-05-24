"use server";

import { db } from "@/app/firebase";
import { getDoc, doc } from "firebase/firestore";

export async function getAllLeave(employeeID: string) {
  try {
    const leaveRef = doc(db, "leaves", employeeID);
    const leaveDoc = await getDoc(leaveRef);

    if (!leaveDoc.exists()) {
      return {
        status: 404,
        message: "No leave applications found for this employee",
      };
    }

    const formattedData = Object.entries(leaveDoc.data() || {}).map(
      ([leaveID, leaveData]) => ({
        id: leaveID,
        ...leaveData,
      })
    );

    return {
      status: 200,
      data: formattedData,
      message: "Leave applications fetched successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching leave applications",
      error,
    };
  }
}
