"use client";

import Link from "next/link";

// Simple welcome page component with a link to the item list
const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Centered Card */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to UGA Items
        </h1>

        {/* Navigation Link to Item List */}
        <div className="mt-12">
          <Link
            href="/show-items"
            className="inline-block px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition rounded"
          >
            Show Item List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
