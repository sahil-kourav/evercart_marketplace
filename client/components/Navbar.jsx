"use client";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { logout } from "@/lib/features/auth/authSlice";
import { assets } from "@/assets/assets";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home",    href: "/"        },
  { label: "Shop",    href: "/shop"    },
  { label: "About",   href: "/about"   },
  { label: "Contact", href: "/contact" },
];

// ── Desktop user dropdown ────────────────────────────────────
const DesktopUserDropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 p-1 rounded-full ring-2 ring-transparent hover:ring-indigo-200 transition"
      >
        <Image
          src={assets.AVATAR}
          alt="Avatar"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-slate-100
          shadow-2xl shadow-slate-200/60 overflow-hidden z-50
          transition-all duration-200 origin-top-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

        <div className="py-1.5">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs">👤</span>
            Profile
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 text-xs">📦</span>
            My Orders
          </Link>
        </div>

        <div className="h-px bg-slate-100 mx-3" />

        <div className="py-1.5">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
          >
            <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 text-xs">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main navbar ──────────────────────────────────────────────
const Navbar = () => {
  const router   = useRouter();
  const dispatch = useDispatch();

  const { cart }                        = useSelector((s) => s.cart);
  const { isAuthenticated, loading }    = useSelector((s) => s.auth);
  const cartCount = cart?.items?.reduce((a, i) => a + i.quantity, 0) || 0;

  const [search,      setSearch]      = useState("");
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [showNavbar,  setShowNavbar]  = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // hide-on-scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNavbar(y < lastScrollY || y < 80);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
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

  if (!mounted) return null;

  return (
    <>
      {/* ── DESKTOP / TABLET NAV ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          bg-white/80 backdrop-blur-xl border-b border-slate-100`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-slate-800 shrink-0">
            <span className="text-green-500">ever</span>cart.
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-slate-600 hover:text-indigo-600 transition font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search — desktop only */}
          <form
            onSubmit={handleSearch}
            className="hidden xl:flex items-center gap-2 bg-slate-50 hover:bg-white focus-within:bg-white
              px-4 py-2 rounded-full border border-transparent focus-within:border-slate-200
              transition-all duration-200 shadow-sm focus-within:shadow-md flex-1 max-w-xs"
          >
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              className="bg-transparent outline-none flex-1 text-sm text-slate-900 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
            )}
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <ShoppingCart size={20} className="text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center
                  text-[10px] font-bold bg-indigo-600 text-white rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            {!loading && (
              <div className="hidden md:flex items-center gap-2">
                {isAuthenticated ? (
                  <DesktopUserDropdown onLogout={handleLogout} />
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="text-sm font-medium px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition"
            >
              <Menu size={22} className="text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU BACKDROP ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 md:hidden
          flex flex-col shadow-2xl
          transform transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Image
              src={assets.AVATAR}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-indigo-100"
            />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {isAuthenticated ? "My Account" : "Welcome"}
              </p>
              <p className="text-xs text-slate-400">
                {isAuthenticated ? "Manage your account" : "Sign in to continue"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Mobile search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-slate-50 focus-within:bg-white px-4 py-2.5 rounded-xl
              border border-transparent focus-within:border-slate-200 transition shadow-sm"
          >
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              className="bg-transparent outline-none flex-1 text-sm text-slate-900 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="text-slate-400 text-xs">✕</button>
            )}
          </form>

          {/* Nav links */}
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
              Navigation
            </p>
            <div className="space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                >
                  {label}
                  <span className="text-slate-300 text-xs">›</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Account section */}
          {!loading && (
            <>
              <div className="h-px bg-slate-100" />

              {isAuthenticated ? (
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
                    Account
                  </p>
                  <div className="space-y-1">
                    {[
                      { label: "Profile",    href: "/profile",  icon: "👤", color: "bg-indigo-50 text-indigo-500" },
                      { label: "My Orders",  href: "/orders",   icon: "📦", color: "bg-violet-50 text-violet-500" },
                    ].map(({ label, href, icon, color }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center text-xs shrink-0`}>
                          {icon}
                        </span>
                        {label}
                        <span className="ml-auto text-slate-300 text-xs">›</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center py-2.5 rounded-xl border border-slate-200
                      text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center py-2.5 rounded-xl bg-indigo-600
                      text-sm font-medium text-white hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Logout pinned at bottom */}
        {isAuthenticated && (
          <div className="px-5 py-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                border border-red-100 text-sm font-medium text-red-500 hover:bg-red-50 transition"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;