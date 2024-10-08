// next js runs on edge
// and its imp!

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation must be done here
    console.log(" reqBody from FORM DATA api/users/signup ",reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // npm i bcryptjs - for password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("----saved user from api/users/signup", savedUser);



    // send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      { message: "yo bro, User registered successfully", success: true, savedUser },
      { status: 200 }
    );
    // shouldn't return password

    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
