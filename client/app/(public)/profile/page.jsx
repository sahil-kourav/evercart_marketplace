
// "use client";
// import React, { useEffect, useState } from "react";
// // import axios from "axios";

// const AVATAR = "https://randomuser.me/api/portraits/men/32.jpg";

// export default function ProfilePage() {
//   // const [user, setUser] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     setLoading(true);
//   //     try {
//   //       // Fetch user profile
//   //       const userRes = await axios.get("/api/auth/me", { withCredentials: true });
//   //       const userData = userRes.data;

//   //       // Fetch addresses
//   //       const addrRes = await axios.get("/api/auth/users/me/addresses", { withCredentials: true });
//   //       const addrData = addrRes.data;

//   //       setUser(userData);
//   //       setAddresses(Array.isArray(addrData) ? addrData : []);
//   //     } catch (err) {
//   //       setUser(null);
//   //       setAddresses([]);
//   //     }
//   //     setLoading(false);
//   //   }
//   //   fetchData();
//   // }, []);

//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
//   //       <div className="text-gray-500 text-lg">Loading...</div>
//   //     </div>
//   //   );
//   // }

//   // if (!user) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
//   //       <div className="text-red-500 text-lg">User not found or not authenticated.</div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="bg-[#f6f8fa] min-h-screen py-6 px-2 flex flex-col items-center">
//       <div className="w-full max-w-2xl flex flex-col gap-5">
//         {/* Profile Header */}
//         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
//           <img
//             src={AVATAR}
//             className="w-16 h-16 rounded-full object-cover border border-[#e5e7eb] shadow-sm"
//           />
//           <div className="flex-1 w-full">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 {/* <h2 className="text-lg font-semibold text-gray-900">{user.name || "No Name"}</h2> */}
//                 <h2 className="text-lg font-semibold text-gray-900">Alex Johnson</h2>
//                 <p className="text-sm text-gray-500 mt-0.5">
//                   {/* Member since {user.memberSince || "N/A"} · {user.role || "User"} */}
//                   Member since Jan 2022 · Customer
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Personal Details */}
//         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-semibold text-gray-900">Personal Details</h3>
//           </div>
//           <div className="divide-y divide-gray-100">
//             <div className="flex items-center justify-between py-2">
//               <span className="text-gray-500 text-sm">Full Name</span>
//               {/* <span className="text-gray-900 text-sm font-medium">{user.name || "No Name"}</span> */}
//               <span className="text-gray-900 text-sm font-medium">Alex Johnson</span>
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <span className="text-gray-500 text-sm">Email Address</span>
//               {/* <span className="text-gray-900 text-sm font-medium">{user.email || "No Email"}</span> */}
//               <span className="text-gray-900 text-sm font-medium">user@example.com</span>
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <span className="text-gray-500 text-sm">Phone Number</span>
//               {/* <span className="text-gray-900 text-sm font-medium">{user.phone || "N/A"}</span> */}
//               <span className="text-gray-900 text-sm font-medium">+91 2343566</span>

//             </div>
//           </div>
//         </section>

//         {/* Security & Privacy */}
//         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 flex items-center justify-center rounded bg-blue-50 text-blue-600">
//               <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 11v5c0 1.1.9 2 2 2h2v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-5c0-4.97-4.03-9-9-9Zm0 2c3.87 0 7 3.13 7 7v5H5v-5c0-3.87 3.13-7 7-7Zm-1 13h2v2h-2v-2Z"/>
//               </svg>
//             </div>
//             <div>
//               <p className="text-gray-900 text-sm font-medium">Security & Privacy</p>
//               <p className="text-gray-500 text-xs">Manage your password and security settings</p>
//             </div>
//           </div>
//           <span className="text-blue-600 text-sm font-medium flex items-center gap-1 cursor-default select-none">
//             Change Password
//             <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
//             </svg>
//           </span>
//         </section>

//         {/* Saved Addresses */}
//         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
//           <div className="mb-4">
//             <h3 className="text-base font-semibold text-gray-900">Saved Addresses</h3>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             {addresses.length === 0 && (
//               <div className="col-span-2 text-gray-400 text-sm text-center py-4">No addresses found.</div>
//             )}
//             {addresses.map((addr, idx) => (
//               <div key={addr.id || idx} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="w-5 h-5 flex items-center justify-center rounded bg-blue-50 text-blue-600">
//                     <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                       <path fill="currentColor" d="M12 3l9 9-1.41 1.41L18 12.83V20a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-7.17l-1.59 1.58L3 12l9-9Z"/>
//                     </svg>
//                   </span>
//                   <span className="font-medium text-gray-900 text-sm">{addr.type || "Address"}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 leading-relaxed mb-2">
//                   {addr.line1}<br />
//                   {addr.line2 && <>{addr.line2}<br /></>}
//                   {addr.city}, {addr.state} {addr.zip}<br />
//                   {addr.country}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Recent Orders (static for now) */}
//         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
//           <div className="mb-4">
//             <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2 text-xs font-semibold text-gray-500">ORDER ID</th>
//                   <th className="py-2 text-xs font-semibold text-gray-500">DATE</th>
//                   <th className="py-2 text-xs font-semibold text-gray-500">STATUS</th>
//                   <th className="py-2 text-xs font-semibold text-gray-500">TOTAL</th>
//                   <th className="py-2 text-xs font-semibold text-gray-500 text-right">ACTION</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <tr>
//                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-8821</td>
//                   <td className="py-2 text-sm text-gray-500">Oct 24, 2023</td>
//                   <td className="py-2">
//                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Delivered</span>
//                   </td>
//                   <td className="py-2 text-sm text-gray-900">$124.50</td>
//                   <td className="py-2 text-right">
//                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-9104</td>
//                   <td className="py-2 text-sm text-gray-500">Nov 02, 2023</td>
//                   <td className="py-2">
//                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
//                   </td>
//                   <td className="py-2 text-sm text-gray-900">$45.00</td>
//                   <td className="py-2 text-right">
//                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-7762</td>
//                   <td className="py-2 text-sm text-gray-500">Sep 15, 2023</td>
//                   <td className="py-2">
//                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Cancelled</span>
//                   </td>
//                   <td className="py-2 text-sm text-gray-900">$210.99</td>
//                   <td className="py-2 text-right">
//                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }













"use client";
import React from "react";

const AVATAR =
  "https://randomuser.me/api/portraits/men/32.jpg";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f6f8fa] px-3 py-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* ================= PROFILE HEADER ================= */}
        <section className="bg-white rounded-xl border shadow-sm px-6 py-5 flex items-center gap-4">
          <img
            src={AVATAR}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Alex Johnson
            </h2>
            <p className="text-sm text-slate-500">
              alex.johnson@example.com
            </p>
          </div>
        </section>

        {/* ================= PERSONAL DETAILS (READ ONLY) ================= */}
        <section className="bg-white rounded-xl border shadow-sm px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">
            Personal Information
          </h3>

          <div className="space-y-3">
            <DetailRow label="Full Name" value="Alex Johnson" />
            <DetailRow label="Email" value="alex.johnson@example.com" />
            <DetailRow label="Phone" value="+1 (555) 012-3456" />
          </div>
        </section>

        {/* ================= ADDRESSES (ONLY EDITABLE SECTION) ================= */}
        <section className="bg-white rounded-xl border shadow-sm px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800">
              Saved Addresses
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:underline">
              + Add Address
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AddressCard
              title="Home"
              address={`123 Sunshine Blvd, Suite 400
Los Angeles, CA 90012
United States`}
            />

            <AddressCard
              title="Office"
              address={`456 Corporate Way, 12th Floor
San Francisco, CA 94105
United States`}
            />
          </div>
        </section>

        {/* ================= RECENT ORDERS (READ ONLY) ================= */}
        <section className="bg-white rounded-xl border shadow-sm px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">
            Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs">
                  <th className="py-2 text-left">Order</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <OrderRow id="#ORD-8821" date="Oct 24, 2023" status="Delivered" amount="$124.50" />
                <OrderRow id="#ORD-9104" date="Nov 02, 2023" status="Pending" amount="$45.00" />
                <OrderRow id="#ORD-7762" date="Sep 15, 2023" status="Cancelled" amount="$210.99" />
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="text-slate-900 font-medium">{value}</span>
  </div>
);

const AddressCard = ({ title, address }) => (
  <div className="border rounded-lg p-4 text-sm">
    <div className="flex items-center justify-between mb-1">
      <span className="font-medium text-slate-900">{title}</span>
      <div className="flex gap-3 text-xs">
        <button className="text-indigo-600 hover:underline">Edit</button>
        <button className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
    <p className="text-slate-500 whitespace-pre-line leading-relaxed">
      {address}
    </p>
  </div>
);

const OrderRow = ({ id, date, status, amount }) => {
  const statusColor =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <tr>
      <td className="py-2 font-medium text-slate-900">{id}</td>
      <td className="py-2 text-slate-500">{date}</td>
      <td className="py-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="py-2 text-right font-medium text-slate-900">{amount}</td>
    </tr>
  );
};
