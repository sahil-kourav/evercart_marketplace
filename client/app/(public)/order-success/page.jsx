// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const OrderSuccess = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/orders");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      
//       {/* ✅ Animation Circle */}
//       <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
//         <span className="text-green-600 text-3xl">✔</span>
//       </div>

//       <h2 className="text-2xl font-semibold mt-4 text-slate-800">
//         Order Placed Successfully 🎉
//       </h2>

//       <p className="text-gray-500 mt-2">
//         {type === "cod"
//           ? "Your order has been placed with Cash on Delivery"
//           : "Payment successful"}
//       </p>

//       <p className="text-sm text-gray-400 mt-4">
//         Redirecting to your orders...
//       </p>
//     </div>
//   );
// };

// export default OrderSuccess;
















import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent";

export const dynamic = "force-dynamic"; // ⭐ required

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}