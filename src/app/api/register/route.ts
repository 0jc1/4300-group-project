import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "../../../models/userSchema";

// Helper function to validate password strength
function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) && // At least one uppercase letter
    /[a-z]/.test(password) && // At least one lowercase letter
    /[0-9]/.test(password) && // At least one digit
    /[^A-Za-z0-9]/.test(password) // At least one special character
  );
}

// POST - Handles new user registration
export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { username, email, password } = await req.json();

    // Validate UGA email
    if (!email.toLowerCase().endsWith("@uga.edu")) {
      return NextResponse.json(
        { error: "Only @uga.edu emails are allowed." },
        { status: 400 }
      );
    }

    // Enforce password strength
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
        },
        { status: 400 }
      );
    }

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

    // Save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
