"use server";

import { db } from "@/app/firebase";
import { StaffData } from "@/app/types/user";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getAllStaff() {
  try {
    const staffCollection = query(
      collection(db, "users"),
      where("role", "!=", "admin")
    );
    const staffSnapshot = await getDocs(staffCollection);
    const staffList = staffSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    if (staffList.length === 0) {
      return {
        status: 404,
        message: "No staff found",
      };
    }

    return {
      status: 200,
      message: "Staff data fetched successfully",
      data: staffList,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching staff data",
      error,
    };
  }
}
