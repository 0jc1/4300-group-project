import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "../../../models/userSchema";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { username, email, password } = await req.json();

    const userExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (userExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    if (usernameExists) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    const newUser = new User({ username, email, password });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
