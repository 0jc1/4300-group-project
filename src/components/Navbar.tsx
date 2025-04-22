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


  const shouldHideCreateButton = ["/", "/login", "/register"].includes(
    pathname
  );

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

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

                {/* Create Item Button always shows */}
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

            {/* Auth Button */}
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
                  <button
                    onClick={() => router.push("/login")}
                    className="text-white bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2"
                  >
                    Login | Register
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#BB231D]">
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