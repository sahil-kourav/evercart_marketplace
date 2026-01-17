"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, logout, authChecked } from "@/lib/features/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/auth/me",
          { withCredentials: true }
        );

        dispatch(loginSuccess(res.data.user));
      } catch (error) {
        dispatch(logout());
      } finally {
         dispatch(authChecked());
      }
    };

    initAuth();
  }, [dispatch]);

  return null;
}
