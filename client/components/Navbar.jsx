"use client";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { logout } from "@/lib/features/auth/authSlice";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ACCOUNT_LINKS = [
  {
    label: "Profile",
    href: "/profile",
    iconBg: "bg-violet-50",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6d28d9"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "My Orders",
    href: "/orders",
    iconBg: "bg-purple-50",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
];

// ── Initials Avatar ──────────────────────────────────────────
const Avatar = ({ name = "U", size = 32 }) => {
  const initials = name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      }}
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none"
    >
      {initials}
    </div>
  );
};

// ── Desktop Dropdown ─────────────────────────────────────────
const DesktopUserDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const displayName = user?.fullName
    ? `${user.fullName.firstName} ${user.fullName.lastName}`
    : user?.email?.split("@")[0] || "Account";

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border transition-all duration-200
          ${
            open
              ? "bg-slate-100 border-slate-200"
              : "border-transparent hover:bg-slate-50 hover:border-slate-200"
          }`}
      >
        <Avatar name={displayName} size={28} />
        <span className="hidden lg:block text-[13px] font-medium text-slate-700 max-w-[80px] truncate">
          {displayName.split(" ")[0]}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`absolute right-0 mt-2.5 w-60 rounded-2xl bg-white z-50
          border border-slate-100 shadow-xl shadow-black/[0.08] overflow-hidden
          transition-all duration-200 origin-top-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Links */}
        <div className="p-2">
          {ACCOUNT_LINKS.map(({ label, href, icon, iconBg }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <span
                className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center shrink-0`}
              >
                {icon}
              </span>
              <span className="text-[13px] font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">
                {label}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Logout */}
        <div className="p-2">
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex items-center gap-3 w-full px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors group"
          >
            <span className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="text-[13px] font-medium text-red-500">
              Sign out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cart } = useSelector((s) => s.cart);
  const { isAuthenticated, loading, user } = useSelector((s) => s.auth);
  const cartCount = cart?.items?.reduce((a, i) => a + i.quantity, 0) || 0;

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNavbar(y < lastScrollY || y < 80);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        // "http://localhost:8080/api/auth/logout",
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(logout());
      toast.success("Logged out successfully.");
      router.replace("/");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setMenuOpen(false);
  };

  const displayName = user?.fullName
    ? `${user.fullName.firstName} ${user.fullName.lastName}`
    : user?.email?.split("@")[0] || "Account";

  if (!mounted) return null;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        bg-white/85 backdrop-blur-xl border-b border-slate-100/80`}
      >
        <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-slate-800 shrink-0 tracking-tight"
          >
            <span className="text-green-500">ever</span>cart.
          </Link>


          <div className="flex-1" />

          {/* Nav links — now on the RIGHT */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[15px] font-medium text-slate-500 hover:text-slate-900
        hover:bg-slate-50 px-3.5 py-2 rounded-lg transition-all duration-150"
              >
                {label}
              </Link>
            ))}
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden xl:flex mx-2 items-center gap-2 bg-slate-50 focus-within:bg-white
    px-3.5 py-2 rounded-xl border border-slate-100 focus-within:border-slate-300
    transition-all duration-200 focus-within:shadow-sm flex-1 max-w-[260px]"
          >
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              className="bg-transparent outline-none flex-1 text-[13px] text-slate-800 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-600 text-xs leading-none"
              >
                ✕
              </button>
            )}
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl
      hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-slate-600"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center
        text-[9px] font-bold bg-indigo-600 text-white rounded-full px-1 border-2 border-white"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop auth */}
            {!loading && (
              <div className="hidden md:flex items-center gap-2">
                <div className="w-px h-5 bg-slate-200 mx-2" />
                {isAuthenticated ? (
                  <DesktopUserDropdown user={user} onLogout={handleLogout} />
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-[13px] font-medium text-slate-600 hover:text-slate-900
              px-3.5 py-2 rounded-lg hover:bg-slate-50 transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="text-[13px] font-medium px-4 py-2 bg-indigo-600
              hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl
      hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-slate-600"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── BACKDROP ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[82%] max-w-[340px] bg-white z-50 md:hidden
        flex flex-col transition-transform duration-300 ease-out shadow-2xl shadow-black/10
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Avatar name={displayName} size={40} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 truncate leading-tight">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.8"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">
                    Welcome
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Sign in to continue
                  </p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition shrink-0"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-slate-50 focus-within:bg-white px-3.5 py-2.5
              rounded-xl border border-slate-100 focus-within:border-slate-300 transition-all shadow-sm"
          >
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              className="bg-transparent outline-none flex-1 text-[13px] text-slate-800 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-slate-400 text-xs"
              >
                ✕
              </button>
            )}
          </form>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2 px-1">
              Navigation
            </p>
            <div className="space-y-0.5">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl
                    text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                >
                  {label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-slate-300"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          {!loading && (
            <>
              <div className="h-px bg-slate-100" />
              {isAuthenticated ? (
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2 px-1">
                    Account
                  </p>
                  <div className="space-y-0.5">
                    {ACCOUNT_LINKS.map(({ label, href, iconBg }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="group-hover:text-indigo-600 transition-colors">
                          {label}
                        </span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="ml-auto text-slate-300"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center py-2.5 rounded-xl border border-slate-200
                      text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center py-2.5 rounded-xl bg-indigo-600
                      text-[13px] font-medium text-white hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Logout pinned bottom */}
        {isAuthenticated && (
          <div className="px-4 py-3.5 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                border-8 border-red-800 text-[13px] font-medium text-red-500 hover:bg-red-50 transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="h-[62px]" />
    </>
  );
};

export default Navbar;
