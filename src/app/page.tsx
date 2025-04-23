"use client";
import Link from "next/link";
import Image from "next/image";
import sniffedLogo from "../../src/assets/Sniffed_Out_Logo.png"; // Logo image

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Fullscreen Background GIF */}
      <img
        src="/uploads/Sniffed-Out.gif"
        alt="Animated background"
        className="absolute top-0 left-0 w-screen h-screen object-cover z-[-2]"
      />

      {/* Clean and minimal blur overlay */}
      <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-[6px] bg-black/20 z-[-1]" />

      {/* App Logo */}
      <Image
        src={sniffedLogo}
        alt="Sniffed Out logo"
        width={350}
        height={350}
        className="mb-4"
      />

      {/* Title */}
      <h1 className="text-6xl font-black tracking-widest text-white">
        SNIFFED OUT
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-xl text-center text-xl font-light leading-snug">
        UGA’s Lost & Found Portal <br />
        Reuniting Dawgs with their stuff, one sniff at a time.
      </p>

      {/* Auth Buttons */}
      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <button className="bg-black px-6 py-3 rounded text-white text-lg font-semibold uppercase hover:bg-gray-900 transition">
            Log In
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-white text-red-700 px-6 py-3 rounded text-lg font-semibold uppercase hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 text-base space-y-2 text-white text-center">
        <p>📍 Tag where you lost it using our map</p>
        <p>📸 Upload a photo of what you're missing</p>
        <p>🔍 Let our digital Dawg help sniff it out!</p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-white text-center">
        <br />
        <br />
        <br />
        Proudly built by <strong>Dawgs</strong>, for <strong>Dawgs</strong> ❤️🐶
      </footer>
    </main>
  );
}
