"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // NEW
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // ❗ change to false so you can handle manually
    });

    console.log("Login result:", res); // You can remove this later

    if (res?.ok && !res.error) {
      router.push("/show-items");
    } else {
      setErrorMessage("Invalid email or password."); // 👈 friendly message
    }
  };

  return (
    <main className="min-h-screen bg-[#BB231D] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>

        {/* Show error message if login fails */}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

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
          Log In
        </button>
      </form>
    </main>
  );
}
