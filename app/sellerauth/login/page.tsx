"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";



export default function SellerLoginPage() {
    const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex bg-[#F5F7FF] overflow-hidden">

      {/* LEFT – LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8">
        <div className="w-full max-w-md">

          {/* TITLE */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome to Seller Panel
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Manage your store, products, and orders seamlessly.
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-3 text-sm
                text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* PASSWORD WITH EYE TOGGLE */}
          <div className="mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-3 pr-11 text-sm
                text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            {/* 👁 Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-gray-800
                transition-colors
              "
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* FORGOT */}
          <div className="text-right mb-6">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* SIGN IN */}
          <button
  type="button"
  disabled={loading}
  onClick={() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // ✅ LOGIN SUCCESS → DASHBOARD
      router.push("/sellerdashboard");
    }, 1500);
  }}
  className={`
    w-full rounded-lg py-3
    font-medium text-white
    flex items-center justify-center gap-2
    transition-all duration-300
    ${loading
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}
  `}
>
  {loading ? (
    <>
      <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      Signing In...
    </>
  ) : (
    "Sign In"
  )}
</button>


          {/* SOCIAL LOGIN */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-gray-500">Login with</span>

            <button className="h-10 w-10 rounded-full border bg-white flex items-center justify-center hover:shadow">
              <img src="/google.jpg" className="h-5 w-5" alt="Google" />
            </button>

            
          </div>

          {/* REGISTER */}
          <p className="mt-8 text-sm text-gray-600">
            Don&apos;t have an Account?{" "}
            <Link
              href="/sellerauth/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT – CURVED BACKGROUND + INFO */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden">

        {/* CURVED BLUE PANEL */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-l-[140px]" />

        {/* SOFT GLOW */}
        <div className="absolute top-24 right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-24 left-24 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10 w-full flex items-center justify-between px-16">

          {/* LEFT INFO */}
          <div className="max-w-sm text-white">
            <h2 className="text-3xl font-semibold mb-4">
              Grow your business with Nirmatri
            </h2>

            <p className="text-white/80 mb-6 text-sm">
              Everything you need to manage, sell, and scale your handcrafted
              products — all in one place.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Manage products & inventory
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Track orders & deliveries
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                View sales & performance insights
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Secure & fast seller payouts
              </li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/user.png"
            alt="Seller Login Illustration"
            className="max-w-[480px] w-full h-auto drop-shadow-2xl translate-y-4"
          />
        </div>
      </div>
    </main>
  );
}
