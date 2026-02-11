"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  // ============================================
  // STATE
  // ============================================
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // ============================================
  // HANDLER
  // ============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: Replace with your API call
    console.log("Sending reset link to:", email);

    setIsLoading(false);
    setIsSuccess(true);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Nirmatri</h1>
            <p className="text-gray-600">Handcrafted with love</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          
          {!isSuccess ? (
            // FORM
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          ) : (
            // SUCCESS
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email!</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to<br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder
              </p>
              <Link
                href="/userauth/login"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
