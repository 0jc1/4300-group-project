"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error
  const [successMessage, setSuccessMessage] = useState(""); // For success

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );
      setErrorMessage("");

      // Wait 2 seconds then redirect
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setErrorMessage(data.error || "Registration failed");
      setSuccessMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[#BB231D] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <button
          type="submit"
          className="bg-[#BB231D] text-white w-full py-2 rounded"
        >
          Register
        </button>
      </form>
    </main>
  );
}
