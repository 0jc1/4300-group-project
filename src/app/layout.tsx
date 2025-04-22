"use client";

import { SessionProvider } from "next-auth/react"; // ✅ NEW
import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {" "}
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
