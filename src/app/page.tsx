"use client";
import Link from "next/link";
import Image from "next/image";
import splashBg from "../../src/assets/Sniffed_Out_Splash_Background.png";
import sniffedLogo from "../../src/assets/Sniffed_Out_Logo.png"; // <--- ADD THIS

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Background Image */}
      <Image
        src={splashBg}
        alt="Splash background"
        fill
        className="object-cover z-[-1]"
        priority
      />
      {/* Logo at the top */}
      <Image
        src={sniffedLogo}
        alt="Sniffed Out logo"
        width={400} // adjust as needed
        height={400}
        className="mb-4"
      />
      {/* Foreground Content */}
      <h1 className="text-6xl font-black tracking-widest text-white">
        SNIFFED OUT
      </h1>
      <p className="mt-4 max-w-xl text-center text-xl font-light leading-snug">
        UGA’s Lost & Found Portal — <br />
        Reuniting Dawgs with their stuff, one sniff at a time.
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <button className="bg-black px-6 py-3 rounded text-white text-lg font-semibold uppercase hover:bg-gray-900 transition">
            Log In
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-white text-red-700 px-6 py-3 rounded text-lg font-semibold uppercase hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </div>

      <div className="mt-12 text-base space-y-2 text-white text-center">
        <p>📍 Tag where you lost it using our map</p>
        <p>📸 Upload a photo of what you're missing</p>
        <p>🔍 Let our digital Dawg help sniff it out!</p>
      </div>

      <footer className="mt-12 text-xs text-white text-center">
        <br />
        <br />
        <br />
        Proudly built by <strong>Dawgs</strong>, for <strong>Dawgs</strong> ❤️🐶
      </footer>
    </main>
  );
}
