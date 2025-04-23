import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "../../../models/userSchema";

// POST - Handles new user registration
export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse request body
    const { username, email, password } = await req.json();

    // Validate that the email ends with @uga.edu
    if (!email.toLowerCase().endsWith("@uga.edu")) {
      return NextResponse.json(
        { error: "Only @uga.edu emails are allowed." },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const userExists = await User.findOne({ email });

    // Check if the username is already taken
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

    // Create and save the new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Respond with success
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
