import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("---- api/users/verifyemail token is logged",token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log("--- user from api/users/verifyemail", user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();


    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
