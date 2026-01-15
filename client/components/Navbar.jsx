// "use client";

// import { Menu, X, Search, ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const router = useRouter();
//   const cartCount = useSelector((state) => state.cart.total);

//   const [search, setSearch] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   /* ----------------------------------
//      Scroll Direction Logic
//   -----------------------------------*/
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 80) {
//         setShowNavbar(false); // scrolling down
//       } else {
//         setShowNavbar(true); // scrolling up
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.push(`/shop?search=${search}`);
//     setSearch("");
//   };

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav
//         className={`fixed top-0 w-full z-50 transition-transform duration-300
//         ${showNavbar ? "translate-y-0" : "-translate-y-full"}
//         bg-white/80 backdrop-blur-md shadow-sm`}
//       >
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//           {/* Logo */}
//           <Link href="/" className="text-3xl font-semibold text-slate-700">
//             <span className="text-green-600">ever</span>cart
//             <span className="text-green-600 text-4xl">.</span>
//           </Link>

//           {/* ========== Desktop Menu ========== */}
//           <div className="hidden md:flex items-center gap-6 text-slate-600">
//             <Link href="/">Home</Link>
//             <Link href="/shop">Shop</Link>
//             <Link href="/about">About</Link>
//             <Link href="/contact">Contact</Link>

//             <form
//               onSubmit={handleSearch}
//               className="hidden xl:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full"
//             >
//               <Search size={18} />
//               <input
//                 className="bg-transparent outline-none w-40"
//                 placeholder="Search products"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </form>

//             <Link href="/cart" className="relative">
//               <ShoppingCart size={18} />
//               <span className="absolute -top-2 -right-2 text-[10px] bg-slate-600 text-white rounded-full px-1">
//                 {cartCount}
//               </span>
//             </Link>

//             <Link href="/auth/login" className="btn-primary">
//               Login
//             </Link>
//             <Link href="/auth/register" className="btn-primary">
//               Register
//             </Link>
//           </div>

//           {/* ========== Mobile Menu Button ========== */}
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* ================= Overlay ================= */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       {/* ================= Mobile Drawer ================= */}
//       <div
//         className={`fixed top-0 right-0 h-screen w-64 bg-white z-50
//         transform transition-transform duration-300
//         ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <button
//           className="absolute top-4 right-4"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <X size={24} />
//         </button>

//         <ul className="flex flex-col gap-6 px-6 pt-20 text-lg text-slate-700">
//           <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
//           <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
//           <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
//           <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
//           <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
//             Cart ({cartCount})
//           </Link>
//           <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
//           <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
//         </ul>
//       </div>

//       {/* Spacer so content doesn't go under navbar */}
//       <div className="h-[72px]" />
//     </>
//   );
// };

// export default Navbar;













"use client";

import { Menu, X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const cartCount = useSelector((state) => state.cart.total);

  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* Scroll hide / show */
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

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setSearch("");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        bg-white/80 backdrop-blur-lg border-b border-slate-200`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-slate-800"
          >
            <span className="text-indigo-600">ever</span>cart
            <span className="text-indigo-600 text-4xl">.</span>
          </Link>

          {/* ========== Desktop Menu ========== */}
          <div className="hidden md:flex items-center gap-8">

            {/* Links */}
            <div className="flex items-center gap-6 text-slate-600 font-medium">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="relative group transition"
                >
                  <span className="group-hover:text-indigo-600">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full
              focus-within:ring-2 focus-within:ring-indigo-500 transition"
            >
              <Search size={18} className="text-slate-500" />
              <input
                className="bg-transparent outline-none w-44 placeholder-slate-400"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-slate-100 transition"
            >
              <ShoppingCart size={20} className="text-slate-700" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-indigo-600 text-white rounded-full px-1">
                {cartCount}
              </span>
            </Link>

            {/* Auth Buttons */}
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-full text-slate-700 font-medium
              hover:bg-slate-100 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium
              hover:bg-indigo-700 shadow-md hover:shadow-lg transition"
            >
              Register
            </Link>
          </div>

          {/* ========== Mobile Menu Button ========== */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ================= Overlay ================= */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ================= Mobile Drawer ================= */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white z-50
        transform transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col gap-6 px-8 pt-24 text-lg font-medium text-slate-700">

          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-indigo-600 transition"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-between hover:text-indigo-600 transition"
          >
            Cart
            <span className="text-sm bg-indigo-600 text-white px-2 rounded-full">
              {cartCount}
            </span>
          </Link>

          <div className="pt-6 flex flex-col gap-3">
            <Link
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-center py-2 rounded-full border border-slate-300
              hover:bg-slate-100 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              onClick={() => setIsMenuOpen(false)}
              className="text-center py-2 rounded-full bg-indigo-600 text-white
              hover:bg-indigo-700 transition shadow"
            >
              Register
            </Link>
          </div>
        </ul>
      </div>

      {/* Spacer */}
      <div className="h-[76px]" />
    </>
  );
};

export default Navbar;
