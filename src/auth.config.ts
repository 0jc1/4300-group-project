// src/auth.config.ts

import { NextAuthConfig } from "next-auth";

// Base NextAuth configuration object
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  providers: [], // Authentication providers (e.g., Google, Credentials) will be added here
};
