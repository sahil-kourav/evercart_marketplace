"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    // loading toast
    const toastId = toast.loading("Creating your account...");

    axios
      .post(
        "http://localhost:8080/api/auth/register",
        {
          fullName: {
            firstName,
            lastName,
          },
          email,
          password,
          phone,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Registration successful!", {
          id: toastId,
        });
        router.push("/"); // redirect after success
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Registration failed, try again later",
          {
            id: toastId,
          }
        );

        setError(error?.message || "Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <aside className="hidden md:flex md:w-2/5 flex-col gap-4 p-8 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
          <div className="w-28 h-28 rounded-lg bg-white/10 flex items-center justify-center" />
          <h3 className="text-lg font-semibold">Welcome to Evercart</h3>
          <p className="text-sm opacity-90">
           Sign up to manage your account, track orders, and enjoy a smooth shopping experience.
          </p>
        </aside>

        {/* Right Section */}
        <main className="w-full md:w-3/5 p-6 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mt-2 text-gray-900">
              Create an account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Quick and secure sign up to get started.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  First name*
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Last name*
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email*</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone*</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="tel"
                placeholder="+91 9876543210"
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
                placeholder="Create a password"
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-sm text-red-500">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
            >
              {loading ? "Creating account..." : "Create account"}
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-indigo-600 hover:underline"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
