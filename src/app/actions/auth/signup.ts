"use server";

import { adminAuth, db, rltdb } from "@/app/firebase";
import { StaffData } from "@/app/types/user";
import { ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

function getNextStaffId(currentId: string): string {
  const prefix = currentId.match(/^[A-Za-z]+/)?.[0] || "";
  const numberPart = currentId.match(/\d+$/)?.[0] || "";
  const nextNumber = (parseInt(numberPart, 10) + 1)
    .toString()
    .padStart(numberPart.length, "0");
  return prefix + nextNumber;
}

export async function SignUp(
  email: string,
  password: string,
  data: StaffData,
  staffID: string
) {
  const newUser = await adminAuth.createUser({
    email,
    password,
    displayName: `${data.firstName} ${data.lastName}`,
  });

  const userId = newUser.uid;

  await adminAuth.setCustomUserClaims(userId, {
    role: data.role.toLowerCase(),
  });

  await setDoc(doc(db, "users", userId), {
    uid: userId,
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
  });

  const nextStaffID = getNextStaffId(staffID);
  await set(ref(rltdb, "LastStaffID"), {
    LastStaffID: nextStaffID,
  });

  return {
    uid: userId,
    name: `${data.firstName} ${data.lastName}`,
    role: data.role.toLowerCase(),
    message: "Staff created successfully",
    status: 200,
  };
}
