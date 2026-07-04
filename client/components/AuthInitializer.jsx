"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  loginSuccess,
  logout,
  authChecked,
} from "@/lib/features/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
          {
            withCredentials: true,
          },
        );

        dispatch(loginSuccess(res.data.user));
      } catch (error) {
        dispatch(logout());

        const protectedRoutes = ["/checkout", "/cart", "/profile", "/orders"];

        const isProtected = protectedRoutes.some((route) =>
          pathname.startsWith(route),
        );

        if (isProtected) {
          router.replace("/auth/login");
        }
      } finally {
        dispatch(authChecked());
      }
    };

    initAuth();
  }, [dispatch, router, pathname]);

  return null;
}
