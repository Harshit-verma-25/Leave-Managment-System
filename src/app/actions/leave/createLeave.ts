"use server";

import { db } from "@/app/firebase";
import { ApplyLeaveProps } from "@/app/types/leaves";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

interface CreateLeave extends ApplyLeaveProps {
  attachment: string | null;
}

export async function createLeave(data: CreateLeave, employeeID: string) {
  try {
    const leaveID = nanoid();
    const leaveRef = doc(db, "leaves", employeeID, leaveID);
    await setDoc(leaveRef, data);

    return {
      status: 200,
      message: "Leave application created successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error creating leave application",
      error,
    };
  }
}
