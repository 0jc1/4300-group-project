"use client";

import { SessionProvider } from "next-auth/react"; // Provides session context to the entire app
import Navbar from "../components/Navbar";
import "./globals.css";

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Provide authentication session to all components */}
        <SessionProvider>
          {/* Global navigation bar */}
          <Navbar />
          {/* Render page content */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
