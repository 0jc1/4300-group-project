import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectMongoDB from "../config/mongodb";
import { authConfig } from "./auth.config";
import User from "../src/models/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

// Initialize NextAuth with custom configuration
export const {
  handlers: { GET, POST }, // Auth route handlers (used for /api/auth/[...nextauth])
  auth, // Used in middleware for route protection
  signIn, // Helper to programmatically trigger sign-in
  signOut, // Helper to trigger sign-out
} = NextAuth({
  ...authConfig, // Include base auth config (e.g., session strategy)
  providers: [
    // Credentials-based authentication (email + password)
    CredentialsProvider({
      credentials: {
        email: {}, // Email input
        password: {}, // Password input
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Ensure MongoDB is connected before querying
        if (mongoose.connection.readyState === 0) {
          await connectMongoDB();
        }

        try {
          // Look up user by email
          const user = await User.findOne({ email: credentials.email }).lean();

          if (user) {
            // Compare provided password with hashed password in DB
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              // Return user object to establish session
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.username,
              };
            } else {
              console.log("Email or Password incorrect");
              return null;
            }
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
});
