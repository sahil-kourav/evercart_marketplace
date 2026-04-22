// import AdminLayout from "@/components/admin/AdminLayout";

// export const metadata = {
//     title: "evercart - Admin",
//     description: "evercart - Admin",
// };

// export default function RootAdminLayout({ children }) {

//     return (
//         <>
//             <AdminLayout>
//                 {children}
//             </AdminLayout>
//         </>
//     );
// }

// "use client";

// import AdminLayout from "@/components/admin/AdminLayout";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export const metadata = {
//     title: "evercart - Admin",
//     description: "evercart - Admin",
// };

// export default function RootAdminLayout({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const check = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/auth/me", {
//           withCredentials: true,
//         });

//         if (res.data?.user?.role !== "seller") {
//           router.replace("/admin/login");
//         }
//       } catch {
//         router.replace("/admin/login");
//       }
//     };

//     check();
//   }, []);

//   return <AdminLayout>{children}</AdminLayout>;
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import loading from "@/components/Loading";
import axios from "axios";

export const metadata = {
    title: "evercart - Admin",
    description: "evercart - Admin",
};

export default function RootAdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          //   "http://localhost:8080/api/auth/me",
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/me`,
          { withCredentials: true },
        );

        if (res.data?.user?.role !== "seller") {
          router.replace("/admin/login");
          return;
        }

        setLoading(false);
      } catch {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading />;

  return <AdminLayout>{children}</AdminLayout>;
}
