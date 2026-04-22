// "use client";

// import { usePathname } from "next/navigation";
// import {
//   HomeIcon,
//   LayoutListIcon,
//   ShieldCheckIcon,
//   SquarePenIcon,
//   SquarePlusIcon,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { assets } from "@/assets/assets";

// const AdminSidebar = () => {
//   const pathname = usePathname();

//   const sidebarLinks = [
//     { name: "Dashboard", href: "/admin", icon: HomeIcon },
//     { name: "Add Product", href: "/admin/add-product", icon: SquarePlusIcon },
//     { name: "Manage Product", href: "/admin/manage-product", icon: SquarePenIcon},
//     { name: "Orders", href: "/admin/orders", icon: LayoutListIcon },
//     { name: "Users", href: "/admin/users", icon: ShieldCheckIcon },
//     { name: "Reviews", href: "/admin/reviews", icon: ShieldCheckIcon },
//   ];

//   return (
//     <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60">


//       <div className="max-sm:mt-6">
//         {sidebarLinks.map((link, index) => (
//           <Link
//             key={index}
//             href={link.href}
//             className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && "bg-slate-100 sm:text-slate-600"}`}
//           >
//             <link.icon size={18} className="sm:ml-5" />
//             <p className="max-sm:hidden">{link.name}</p>
//             {pathname === link.href && (
//               <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;













"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  ClipboardList,
  Users,
  Star,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { name: "Dashboard",       href: "/admin",                icon: LayoutDashboard },
  { name: "Add Product",     href: "/admin/add-product",    icon: PackagePlus     },
  { name: "Manage Product",  href: "/admin/manage-product", icon: PackageSearch   },
  { name: "Orders",          href: "/admin/orders",         icon: ClipboardList   },
  { name: "Reviews",         href: "/admin/reviews",        icon: Star            },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white sm:min-w-60 w-14 sm:w-60 transition-all duration-200">

      {/* ── Branding header ── */}
      <div className="flex gap-3 px-5 py-5 border-b border-slate-100">
        {/* Icon */}
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
        </div>
        {/* Text — hidden on mobile */}
        <div className="max-sm:hidden">
          <p className="text-[17px] font-bold text-slate-900 leading-tight">
            ever<span className="text-green-600">cart</span>
          </p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-tight">
            Admin Panel
          </p>
        </div>
      </div>


      {/* ── Links ── */}
      <nav className="flex flex-col gap-1 px-4 pb-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-3 text-md text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && "bg-slate-100 sm:text-slate-600"}`}
            >
              <link.icon
                size={17}
                className={`shrink-0 text-slate-400`}
              />
              <span className="max-sm:hidden">{link.name}</span>

              {/* Active dot for mobile */}
              {pathname === link.href && (
               <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
             )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom version tag ── */}
      <div className="mt-auto border-t border-slate-100 px-5 py-4 max-sm:hidden">
        <p className="text-[10px] text-slate-400">EverCart Admin v1.0</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;