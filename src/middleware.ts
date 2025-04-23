import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

// Initialize the NextAuth handler
const { auth } = NextAuth(authConfig);

// Middleware to protect specific routes based on authentication
const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  console.log("Authenticated:", isAuthenticated, "Path:", pathname);

  // Define public routes that do not require authentication
  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/show-item",
    "/show-items",
    "/api/items",
  ];

  // If user is not authenticated and trying to access a protected route, redirect
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to the requested route
  return NextResponse.next();
};

// Define which routes this middleware should apply to
export const config = {
  matcher: ["/create-item/:path*", "/update-item/:path*"], // Protected paths
};

export default middleware;
