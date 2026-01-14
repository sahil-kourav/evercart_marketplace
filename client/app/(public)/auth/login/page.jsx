"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    // show loading toast
    const toastId = toast.loading("Logging you in...");

    axios
      .post(
        "http://localhost:8080/api/auth/login",
        {
          identifier,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Login successful!", {
          id: toastId,
        });

        router.push("/");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Invalid email or password please try again later",
          {
            id: toastId,
          }
        );

        setError(err?.message || "Invalid credentials provided please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <aside className="hidden md:flex md:w-2/5 flex-col gap-4 p-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
          <div className="w-28 h-28 rounded-lg bg-white/10 flex items-center justify-center" />
          <h3 className="text-lg font-semibold">Welcome back</h3>
          <p className="text-sm opacity-90">
            Sign in to access your account, track orders, and continue shopping securely.
          </p>
        </aside>

        {/* Right Section */}
        <main className="w-full md:w-3/5 p-6 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mt-2 text-gray-900">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage your account securely.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email or Phone Number*
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Enter your email or phone number"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password*
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Error */}
            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-2 px-4 
                 ${
                   loading
                     ? "bg-indigo-400"
                     : "bg-indigo-600 hover:bg-indigo-700"
                 } text-white rounded-md font-medium transition-colors duration-200`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google */}
            <button className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
              Continue with Google
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/register"
              className="text-sm text-indigo-600 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
