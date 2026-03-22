
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProduct } from "@/lib/features/product/productSlice";

export default function PublicLayout({ children }) {    
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LAYOUT RUNNING 🔥");
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/products");
        dispatch(setProduct(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [dispatch]);

 return (
        <>
            {/* <Banner /> */}
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

