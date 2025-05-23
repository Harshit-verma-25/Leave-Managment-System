"use server";

import { adminAuth, clientAuth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function Login(data: {
  email: string;
  password: string;
  role: string;
}) {
  const { email, password } = data;

  try {
    const existingUser = await adminAuth.getUserByEmail(email);

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    // Sign in using Firebase Client SDK
    const userDetails = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password
    );

    if (!userDetails) {
      return {
        status: 401,
        message: "Invalid credentials",
      };
    }

    const token = await userDetails.user.getIdToken();

    // Verify token using Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!decodedToken) {
      return {
        status: 401,
        message: "Invalid token",
      };
    }

    const userId = decodedToken.uid;
    const role = decodedToken.role;
    const name = decodedToken.name;

    if (role.toLowerCase() !== data.role.toLowerCase()) {
      return {
        status: 403,
        message: "Unauthorized role",
      };
    }

    return {
      uid: userId,
      name,
      role,
      status: 200,
    };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}
