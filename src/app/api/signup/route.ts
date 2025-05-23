import { NextRequest, NextResponse } from "next/server";
import { SignUp } from "@/app/actions/auth/signup";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, password, data, staffID } = body;

  try {
    const response = await SignUp(email, password, data, staffID);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
