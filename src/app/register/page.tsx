"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Form state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enforce @uga.edu email restriction
    if (!email.toLowerCase().endsWith("@uga.edu")) {
      setErrorMessage("Only @uga.edu emails are allowed.");
      setSuccessMessage("");
      return;
    }

    // Send POST request to register API
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // Handle successful registration
    if (res.ok) {
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );
      setErrorMessage("");

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      // Show error message from server or fallback
      setErrorMessage(data.error || "Registration failed");
      setSuccessMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/uploads/LogIn_Background.png')] bg-cover bg-center flex items-center justify-center px-4 py-10">
      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/90 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center">Register</h2>

        {/* Display error message */}
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-3 rounded-lg text-center text-sm font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Display success message */}
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-3 rounded-lg text-center text-sm font-semibold">
            {successMessage}
          </div>
        )}

        {/* Input fields */}
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB231D]"
            required
          />
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
          Register
        </button>
      </form>

      {/* Animation for form fade-in */}
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
