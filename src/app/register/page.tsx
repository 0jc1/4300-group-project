'use client';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-red-600 flex items-center justify-center p-8">
      <form className="bg-black text-white rounded-xl p-6 w-96 space-y-4 shadow-2xl border border-white">
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
        <button className="bg-white text-black w-full py-2 rounded">
          Register
        </button>
      </form>
    </main>
  );
}

