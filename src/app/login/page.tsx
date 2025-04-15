"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      login(); // <- updates context + localStorage
      router.push("/show-items");
    }
  };

  return (
    <main className="min-h-screen bg-red-600 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 rounded bg-white text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 rounded bg-white text-black"
        />
        <button
          type="submit"
          className="bg-[#BB231D] text-white w-full py-2 rounded"
        >
          Log In
        </button>
      </form>
    </main>
  );
}
