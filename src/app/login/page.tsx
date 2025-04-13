'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (email && password) {
      login();
      router.push('/show-items'); // redirect after login
    }
  };

  return (
    <main className="relative min-h-screen bg-red-600 overflow-hidden flex items-center justify-center p-8">
      {/* Blurred background with placeholder cards */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 gap-4 p-10 opacity-40 blur-sm">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white/90 h-48 rounded-lg flex flex-col justify-end p-4 text-black shadow-md"
          >
            <p className="text-sm font-medium">Description</p>
            <p className="text-xs">Location</p>
          </div>
        ))}
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-black text-white rounded-xl p-6 w-96 space-y-4 shadow-2xl border border-red-500"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <input
            type="email"
            value={email}
                onChange={(e) => setEmail(e.target.value)}
             placeholder="Email"
         className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />

            <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="w-full p-2 rounded bg-white text-black border border-gray-300"
/>
        <button
          type="submit"
          className="bg-red-600 text-white w-full py-2 rounded"
        >
          Log In
        </button>
        <p className="text-sm text-white underline text-center cursor-pointer">
          Forgot password?
        </p>
      </form>
    </main>
  );
}
