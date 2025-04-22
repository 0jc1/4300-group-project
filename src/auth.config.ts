// src/auth.config.ts
import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
};
