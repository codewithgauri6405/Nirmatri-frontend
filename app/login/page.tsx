"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // ❌ validation
    

    // ✅ clear error & continue
    setError("");
    setLoading(true);

 
    setTimeout(() => {
      router.push("/shop");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#F4F7FD] backdrop-blur-sm
                     flex items-center justify-center px-4 text-gray-900">

      <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl
                      rounded-2xl border border-white/50
                      shadow-lg p-12">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-blue-600 text-white
                            flex items-center justify-center font-semibold">
              N
            </div>
            <span className="text-base font-semibold text-gray-800">
              Nirmatri
            </span>
          </div>

          
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          Login
        </h1>

        {/* EMAIL */}
        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-gray-300/60
                       bg-white/60 px-4 py-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
          {/* PASSWORD WITH EYE TOGGLE */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300/60
                         bg-white/60 px-4 py-4 pr-12 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 👁 Eye Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-gray-500 hover:text-gray-800 transition"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-sm text-red-600 mb-6">
            {error}
          </p>
        )}

        {/* FORGOT */}
        <div className="text-right mb-10">
          <Link href="/forgot-password"
                className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-4
                     text-white text-sm font-medium
                     hover:bg-blue-700 transition
                     flex items-center justify-center gap-2
                     disabled:opacity-70">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* GOOGLE */}
        <button
          className="mt-6 w-full flex items-center justify-center gap-3
                     rounded-xl border border-gray-300/60
                     bg-white/70 py-4 text-sm font-medium
                     text-gray-700 hover:bg-white transition">
          <img src="/google.jpg" className="h-5 w-5" alt="Google" />
          Continue with Google
        </button>

        <p className="mt-10 text-sm text-gray-700 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
