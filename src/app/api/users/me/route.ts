// user's own profile
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
 
connectDB();

export async function POST(request: NextRequest) {
  try {
    // extract data from token

    const userId = await getDataFromToken(request);
    // console.log("-----userId: ", userId);

    const user = await User.findOne({ _id: userId }).select("-password"); // password will be excluded
    // console.log("-----user profile found: ", user);

    // .select("-password -username")
    // password,username - these feild will not be sent ahead

    // check if there is no user found - TODO 

    return NextResponse.json({ message: "User found", data: user });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
