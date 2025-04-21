"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "../assets/UGAlogo_Arch_1in.png";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, login, logout } = useAuth();

  const shouldHideCreateButton = ["/", "/login", "/register"].includes(
    pathname
  );

  return (
    <nav className="bg-[#141514] border-b border-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo */}
          <Link className="flex flex-shrink-0 items-center" href="/">
            <Image className="h-10 w-auto" src={logo} alt="UGA arch logo" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              Sniffed Out
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:ml-6 md:block">
            <div className="flex space-x-4 items-center">
              <Link
                href="/show-items"
                className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Contact
              </Link>

              {isLoggedIn && !shouldHideCreateButton && (
                <Link
                  href="/create-item"
                  className="bg-[#BB231D] text-white px-4 py-2 rounded hover:bg-red-800"
                >
                  Create New Item
                </Link>
              )}
            </div>
          </div>

          {/* Auth Button */}
          <div className="hidden md:block md:ml-6">
            <div className="flex items-center">
              {!isLoggedIn ? (
                <button
                  onClick={() => router.push("/login")}
                  className="text-white bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
                >
                  Login | Register
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="text-white bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
