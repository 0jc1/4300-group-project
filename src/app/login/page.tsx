"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Handle form submission and user authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use NextAuth credentials provider to log in
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent default redirect
    });

    // If login is successful, navigate to item dashboard
    if (res?.ok && !res.error) {
      router.push("/show-items");
    } else {
      // Show error if login fails
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/uploads/LogIn_Background.png')] bg-cover bg-center flex items-center justify-center px-4 py-10">
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/90 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center">Log In</h2>

        {/* Display error message if login fails */}
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-3 rounded-lg text-center text-sm font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Email and password inputs */}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB231D]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB231D]"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#BB231D] hover:bg-red-800 transition-all py-3 rounded-lg text-white font-bold text-lg shadow-md"
        >
          Log In
        </button>
      </form>

      {/* Fade-in animation for the login form */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
