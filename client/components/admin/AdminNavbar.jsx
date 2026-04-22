"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { LogOut, ShieldCheck, Loader2 } from "lucide-react";

const AdminNavbar = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [checking, setChecking] = useState(true);


  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(
        `http://localhost:8080/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully.");
      router.replace("/admin/login");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 sm:px-10 py-3.5">

        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-900 font-bold text-2xl tracking-tight">
              ever<span className="text-green-600">cart</span>
            </span>
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Admin
            </span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Admin badge */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-600">A</span>
            </div>
            <span className="text-sm font-medium text-slate-700">Admin</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-slate-200" />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
          >
            {loggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {loggingOut ? "Signing out..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;