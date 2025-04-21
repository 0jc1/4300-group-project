"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../assets/UGAlogo_Arch_1in.png";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const shouldHideCreateButton = ["/", "/login", "/register"].includes(
    pathname
  );

  return (
    <nav className="bg-[#141514] border-b border-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <Link className="flex flex-shrink-0 items-center" href="/">
            <Image className="h-10 w-auto" src={logo} alt="UGA arch logo" />
            <span className="hidden md:block text-white text-lg sm:text-xl md:text-2xl font-bold ml-2">
              Sniffed Out
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/show-items"
              className="text-white text-xs sm:text-sm md:text-base hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white text-xs sm:text-sm md:text-base hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white text-xs sm:text-sm md:text-base hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Contact
            </Link>

            {isLoggedIn && !shouldHideCreateButton && (
              <Link
                href="/create-item"
                className="bg-[#BB231D] text-xs sm:text-sm text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Create New Item
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="text-white text-xs sm:text-sm bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
              >
                Login | Register
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-white text-xs sm:text-sm bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/show-items"
              className="block text-white text-sm rounded-md px-3 py-2 hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white text-sm rounded-md px-3 py-2 hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-white text-sm rounded-md px-3 py-2 hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {isLoggedIn && !shouldHideCreateButton && (
              <Link
                href="/create-item"
                className="block bg-[#BB231D] text-white text-sm px-4 py-2 rounded hover:bg-red-800"
                onClick={() => setMenuOpen(false)}
              >
                Create New Item
              </Link>
            )}

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-white bg-gray-700 hover:bg-gray-900 rounded-md px-4 py-2 mt-2"
              >
                Login | Register
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-white bg-gray-700 hover:bg-gray-900 rounded-md px-4 py-2 mt-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
