"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password strength logic
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const labels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-400",
      "bg-yellow-400",
      "bg-green-500",
      "bg-green-700",
    ];

    return {
      score,
      label: labels[score - 1] || "Very Weak",
      color: colors[score - 1] || "bg-red-500",
      width: `${(score / 5) * 100}%`,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.toLowerCase().endsWith("@uga.edu")) {
      setErrorMessage("Only @uga.edu emails are allowed.");
      setSuccessMessage("");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMessage("Account created successfully! Redirecting...");
      setErrorMessage("");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setErrorMessage(data.error || "Registration failed");
      setSuccessMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/uploads/LogIn_Background.png')] bg-cover bg-center flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/90 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center">Register</h2>

        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-3 rounded-lg text-center text-sm font-semibold">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-3 rounded-lg text-center text-sm font-semibold">
            {successMessage}
          </div>
        )}

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

          {/* Password input with strength bar */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB231D]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div className="w-full">
                <div className="h-2 bg-gray-300 rounded">
                  <div
                    className={`h-full rounded transition-all duration-300 ${
                      getPasswordStrength(password).color
                    }`}
                    style={{ width: getPasswordStrength(password).width }}
                  />
                </div>
                <p className="text-sm mt-1 text-white">
                  Strength:{" "}
                  <span className="font-semibold">
                    {getPasswordStrength(password).label}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#BB231D] hover:bg-red-800 transition-all py-3 rounded-lg text-white font-bold text-lg shadow-md"
        >
          Register
        </button>
      </form>

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
