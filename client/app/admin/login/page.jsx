"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    const toastId = toast.loading("Signing in as admin...");

    try {
      const res = await axios.post(
        // "http://localhost:8080/api/auth/login-admin",
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/login-admin`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.user?.role !== "seller") {
        toast.error("Only admins can access this page", { id: toastId });
        return;
      }

      toast.success("Admin login successful 🚀", { id: toastId });

      router.push("/admin");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE (Branding) */}
        <div className="hidden md:flex md:w-2/5 flex-col justify-between p-10 bg-gradient-to-br from-slate-900 to-slate-700 text-white">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-semibold">EverCart Admin</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Welcome back 👋
            </h3>

            <p className="text-sm text-slate-300">
              Login to manage products, orders, users and monitor your store performance.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            Secure admin access only
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full md:w-3/5 p-8 md:p-12">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-800">
              Admin Sign In
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Signing in...
                </>
              ) : (
                "Login as Admin"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}