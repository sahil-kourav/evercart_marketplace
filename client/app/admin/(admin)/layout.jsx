"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import Loading from "@/components/Loading"; 
import axios from "axios";

export default function RootAdminLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (res.data?.user?.role !== "seller") {
          router.replace("/admin/login");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <Loading />;

  return <AdminLayout>{children}</AdminLayout>;
}