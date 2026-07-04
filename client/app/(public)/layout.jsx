"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { setProduct } from "@/lib/features/product/productSlice";
import { ShieldAlertIcon, ArrowRightIcon } from "lucide-react";

export default function PublicLayout({ children }) {
  const dispatch = useDispatch();
  
  const { user, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:8081/api/products"
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, 
          { withCredentials: true },
        );
        dispatch(setProduct(res.data.data));
      } catch (err) {
        // console.error("Error fetching products in layout:", err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (authLoading) {
    return <Loading />;
  }

if (user?.role === "seller") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-white">401</h1>
        <div className="w-px h-10 bg-white/30" />
        <div>
          <p className="text-white text-sm">You are not authorized to access this page.</p>
          <p className="text-white/40 text-sm">Admin routes start with <span className="font-mono text-white/70">/admin</span></p>
        </div>
      </div>
    </div>
  );
}
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
