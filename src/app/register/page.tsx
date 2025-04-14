"use client";
import Image from "next/image";
import splashBg from "../../assets/Sniffed_Out_Splash_Background.png";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      {/* Background image layer */}
      <Image
        src={splashBg}
        alt="Background"
        fill
        className="object-cover z-[-1]"
        priority
      />

      {/* Foreground form content */}
      <div className="relative z-10 transform -translate-x-2 -translate-y-30">
        <form className="bg-black bg-opacity-80 text-white rounded-xl p-6 w-96 space-y-4 shadow-2xl border border-white">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-white text-black border border-gray-300"
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <label className="text-sm">I agree to the terms</label>
          </div>
          <button className="bg-[#BB231D] text-white w-full py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
