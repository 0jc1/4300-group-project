import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectMongoDB from "../config/mongodb";
import { authConfig } from "./auth.config";
import User from "../src/models/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth, // <-- this export is what middleware uses
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (mongoose.connection.readyState === 0) {
          await connectMongoDB();
        }

        try {
          const user = await User.findOne({ email: credentials.email }).lean();
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
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
