"use client";

import Link from "next/link";
import Content from "../components/Content";

// Custom 404 page
export default function NotFound() {
  return (
    <Content>
      <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/uploads/Contact_Background.png"
            alt="Contact Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* 404 Error Card */}
        <div className="bg-white/100 backdrop-blur-lg p-10 rounded-3xl text-center shadow-2xl max-w-md w-full animate-fadeInUp space-y-4">
          {/* Icon Placeholder */}
          <div className="text-6xl">🐾</div>

          {/* Page Not Found Message */}
          <h1 className="text-4xl font-bold text-[#BB231D]">Page Not Found</h1>
          <p className="text-gray-700">
            Oops, we couldn’t sniff out that page.
          </p>

          {/* Redirect to Homepage */}
          <Link
            href="/"
            className="inline-block mt-4 bg-[#BB231D] hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>

      {/* Fade-in Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </Content>
  );
}
