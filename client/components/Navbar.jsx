"use client";

import { Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

import { logout } from "@/lib/features/auth/authSlice";

const DesktopUserDropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full
                   bg-slate-100 hover:bg-slate-200 transition"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br
                     from-indigo-500 to-green-500
                     flex items-center justify-center
                     text-white text-sm font-semibold"
        >
          U
        </div>

        {/* Text */}
        <span className="hidden lg:block text-sm font-medium text-slate-700">
          Account
        </span>

        {/* Arrow */}
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-4 w-56 rounded-xl
                     bg-white border border-slate-200
                     shadow-xl overflow-hidden z-50"
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <Link
            href="/orders"
            className="block px-4 py-2 text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            My Orders
          </Link>

          <Link
            href="/settings"
            className="block px-4 py-2 text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>

          <div className="h-px bg-slate-100" />

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2
                       text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


/* =========================================================
   NAVBAR
========================================================= */
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  /* Redux State */
  const cartCount = useSelector((state) => state.cart.total);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  /* Local State */
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

 
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true },
      );

      dispatch(logout());
      toast.success("Logged out successfully");
      router.replace("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setIsMenuOpen(false);
    }
  };

  /* Search */
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setSearch("");
  };

  return (
    <>

      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        bg-white/80 backdrop-blur-lg border-b border-slate-200`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-slate-800">
            <span className="text-green-600">ever</span>cart.
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Shop", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="text-slate-600 hover:text-indigo-600"
              >
                {item}
              </Link>
            ))}

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center gap-2
                         bg-slate-100 px-4 py-2 rounded-full"
            >
              <Search size={18} />
              <input
                className="bg-transparent outline-none w-40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart />
              <span
                className="absolute -top-1 -right-1 text-xs
                           bg-indigo-600 text-white px-1 rounded-full"
              >
                {cartCount}
              </span>
            </Link>

            {/* Auth */}
            {!loading &&
              (isAuthenticated ? (
                <DesktopUserDropdown onLogout={handleLogout} />
              ) : (
                <>
                  <Link href="/auth/login">Login</Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2 bg-indigo-600
                               text-white rounded-full"
                  >
                    Register
                  </Link>
                </>
              ))}
          </div>

          {/* ================= MOBILE ACTIONS ================= */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={22} />
              <span
                className="absolute -top-1 -right-1 text-[10px]
                           bg-indigo-600 text-white px-1.5 rounded-full"
              >
                {cartCount}
              </span>
            </Link>

            {/* Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1 rounded-md hover:bg-slate-100"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>


      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50
  transform transition-transform duration-300 ease-out
  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-green-500
        flex items-center justify-center text-white font-semibold text-lg"
            >
              U
            </div>

            {/* User Info */}
            <div>
              <p className="text-base font-semibold text-slate-800">
                {isAuthenticated ? "My Account" : "Welcome"}
              </p>
              <p className="text-sm text-slate-500">
                {isAuthenticated
                  ? "Manage your account"
                  : "Sign in to continue"}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-6 py-6 space-y-8 text-slate-700">
          {/* -------- NAVIGATION -------- */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Navigation
            </p>

            <div className="space-y-5">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium hover:text-indigo-600 transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* -------- ACCOUNT / AUTH -------- */}
          {!loading &&
            (isAuthenticated ? (
              <div>
                <p className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Account
                </p>

                <div className="space-y-5">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium hover:text-indigo-600 transition"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium hover:text-indigo-600 transition"
                  >
                    My Orders
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium hover:text-indigo-600 transition"
                  >
                    Settings
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="mt-6 w-full py-2.5 rounded-xl
              border border-red-200 text-red-600 font-medium
              hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center py-2.5 rounded-xl
            border border-slate-300 font-medium
            hover:bg-slate-100 transition"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center py-2.5 rounded-xl
            bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
};

export default Navbar;
