"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import logo from "../assets/UGAlogo_Arch_1in.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  // Determine if the Create Item button should be hidden on certain pages
  const shouldHideCreateButton = ["/", "/login", "/register"].includes(
    pathname
  );

  // Handle user logout and redirect to homepage
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  // Navigate to the create-item page if logged in, else show modal
  const handleCreateClick = () => {
    if (!session?.user) {
      setShowModal(true);
      return;
    }
    router.push("/create-item");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="bg-[#141514] border-b border-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* Logo and brand name */}
            <Link
              className="flex flex-shrink-0 items-center"
              href={session?.user ? "/show-items" : "/"}
            >
              <Image className="h-10 w-auto" src={logo} alt="UGA arch logo" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Sniffed Out
              </span>
            </Link>

            {/* Navigation links */}
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
                <Link
                  href="/profile"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Profile
                </Link>

                {/* Conditional Create Item button */}
                {!shouldHideCreateButton && (
                  <button
                    onClick={handleCreateClick}
                    className="bg-[#BB231D] text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Create New Item
                  </button>
                )}
              </div>
            </div>

            {/* Authentication area */}
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {status === "loading" ? (
                  <div className="text-white">Loading...</div>
                ) : session?.user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-white">
                      Welcome, {session.user.name}!
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push("/login")}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l-full text-black font-semibold"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/register")}
                      className="px-4 py-2 bg-[#BB231D] hover:bg-red-800 rounded-r-full text-white font-semibold"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal shown when unauthenticated user tries to create an item */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#B7372F]">
              Access Denied
            </h2>
            <p className="text-gray-700 mb-6">
              You must have an account to create an item.
            </p>
            <button
              onClick={closeModal}
              className="bg-[#BB231D] text-white px-4 py-2 rounded hover:bg-red-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
