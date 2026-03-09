// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const AVATAR = "https://randomuser.me/api/portraits/men/32.jpg";

// // export default function ProfilePage() {
// //   const [user, setUser] = useState(null);
// //   const [addresses, setAddresses] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchData() {
// //       setLoading(true);
// //       try {
// //         // Fetch user profile
// //         const userRes = await axios.get("/api/auth/me", { withCredentials: true });
// //         const userData = userRes.data;

// //         // Fetch addresses
// //         const addrRes = await axios.get("/api/auth/users/me/addresses", { withCredentials: true });
// //         const addrData = addrRes.data;

// //         setUser(userData);
// //         setAddresses(Array.isArray(addrData) ? addrData : []);
// //       } catch (err) {
// //         setUser(null);
// //         setAddresses([]);
// //       }
// //       setLoading(false);
// //     }
// //     fetchData();
// //   }, []);

// //   // if (loading) {
// //   //   return (
// //   //     <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
// //   //       <div className="text-gray-500 text-lg">Loading...</div>
// //   //     </div>
// //   //   );
// //   // }

// //   if (!user) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
// //         <div className="text-red-500 text-lg">User not found or not authenticated.</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-[#f6f8fa] min-h-screen py-6 px-2 flex flex-col items-center">
// //       <div className="w-full max-w-2xl flex flex-col gap-5">
// //         {/* Profile Header */}
// //         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
// //           <img
// //             src={AVATAR}
// //             className="w-16 h-16 rounded-full object-cover border border-[#e5e7eb] shadow-sm"
// //           />
// //           <div className="flex-1 w-full">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //               <div>
// //                 {/* <h2 className="text-lg font-semibold text-gray-900">{user.name || "No Name"}</h2> */}
// //                 <h2 className="text-lg font-semibold text-gray-900">Alex Johnson</h2>
// //                 <p className="text-sm text-gray-500 mt-0.5">
// //                   {/* Member since {user.memberSince || "N/A"} · {user.role || "User"} */}
// //                   Member since Jan 2022 · Customer
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Personal Details */}
// //         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
// //           <div className="flex items-center justify-between mb-4">
// //             <h3 className="text-base font-semibold text-gray-900">Personal Details</h3>
// //           </div>
// //           <div className="divide-y divide-gray-100">
// //             <div className="flex items-center justify-between py-2">
// //               <span className="text-gray-500 text-sm">Full Name</span>
// //               {/* <span className="text-gray-900 text-sm font-medium">{user.name || "No Name"}</span> */}
// //               <span className="text-gray-900 text-sm font-medium">Alex Johnson</span>
// //             </div>
// //             <div className="flex items-center justify-between py-2">
// //               <span className="text-gray-500 text-sm">Email Address</span>
// //               {/* <span className="text-gray-900 text-sm font-medium">{user.email || "No Email"}</span> */}
// //               <span className="text-gray-900 text-sm font-medium">user@example.com</span>
// //             </div>
// //             <div className="flex items-center justify-between py-2">
// //               <span className="text-gray-500 text-sm">Phone Number</span>
// //               {/* <span className="text-gray-900 text-sm font-medium">{user.phone || "N/A"}</span> */}
// //               <span className="text-gray-900 text-sm font-medium">+91 2343566</span>

// //             </div>
// //           </div>
// //         </section>

// //         {/* Security & Privacy */}
// //         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="w-6 h-6 flex items-center justify-center rounded bg-blue-50 text-blue-600">
// //               <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
// //                 <path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 11v5c0 1.1.9 2 2 2h2v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-5c0-4.97-4.03-9-9-9Zm0 2c3.87 0 7 3.13 7 7v5H5v-5c0-3.87 3.13-7 7-7Zm-1 13h2v2h-2v-2Z"/>
// //               </svg>
// //             </div>
// //             <div>
// //               <p className="text-gray-900 text-sm font-medium">Security & Privacy</p>
// //               <p className="text-gray-500 text-xs">Manage your password and security settings</p>
// //             </div>
// //           </div>
// //           <span className="text-blue-600 text-sm font-medium flex items-center gap-1 cursor-default select-none">
// //             Change Password
// //             <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
// //               <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
// //             </svg>
// //           </span>
// //         </section>

// //         {/* Saved Addresses */}
// //         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
// //           <div className="mb-4">
// //             <h3 className="text-base font-semibold text-gray-900">Saved Addresses</h3>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
// //             {addresses.length === 0 && (
// //               <div className="col-span-2 text-gray-400 text-sm text-center py-4">No addresses found.</div>
// //             )}
// //             {addresses.map((addr, idx) => (
// //               <div key={addr.id || idx} className="border border-gray-200 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 mb-1">
// //                   <span className="w-5 h-5 flex items-center justify-center rounded bg-blue-50 text-blue-600">
// //                     <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
// //                       <path fill="currentColor" d="M12 3l9 9-1.41 1.41L18 12.83V20a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-7.17l-1.59 1.58L3 12l9-9Z"/>
// //                     </svg>
// //                   </span>
// //                   <span className="font-medium text-gray-900 text-sm">{addr.type || "Address"}</span>
// //                 </div>
// //                 <p className="text-xs text-gray-500 leading-relaxed mb-2">
// //                   {addr.line1}<br />
// //                   {addr.line2 && <>{addr.line2}<br /></>}
// //                   {addr.city}, {addr.state} {addr.zip}<br />
// //                   {addr.country}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Recent Orders (static for now) */}
// //         <section className="bg-white rounded-xl shadow border border-[#e5e7eb] px-6 py-5">
// //           <div className="mb-4">
// //             <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
// //           </div>
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-left">
// //               <thead>
// //                 <tr>
// //                   <th className="py-2 text-xs font-semibold text-gray-500">ORDER ID</th>
// //                   <th className="py-2 text-xs font-semibold text-gray-500">DATE</th>
// //                   <th className="py-2 text-xs font-semibold text-gray-500">STATUS</th>
// //                   <th className="py-2 text-xs font-semibold text-gray-500">TOTAL</th>
// //                   <th className="py-2 text-xs font-semibold text-gray-500 text-right">ACTION</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-100">
// //                 <tr>
// //                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-8821</td>
// //                   <td className="py-2 text-sm text-gray-500">Oct 24, 2023</td>
// //                   <td className="py-2">
// //                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Delivered</span>
// //                   </td>
// //                   <td className="py-2 text-sm text-gray-900">$124.50</td>
// //                   <td className="py-2 text-right">
// //                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-9104</td>
// //                   <td className="py-2 text-sm text-gray-500">Nov 02, 2023</td>
// //                   <td className="py-2">
// //                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
// //                   </td>
// //                   <td className="py-2 text-sm text-gray-900">$45.00</td>
// //                   <td className="py-2 text-right">
// //                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-2 text-sm font-medium text-gray-900">#ORD-7762</td>
// //                   <td className="py-2 text-sm text-gray-500">Sep 15, 2023</td>
// //                   <td className="py-2">
// //                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Cancelled</span>
// //                   </td>
// //                   <td className="py-2 text-sm text-gray-900">$210.99</td>
// //                   <td className="py-2 text-right">
// //                     <span className="text-blue-600 text-xs font-semibold cursor-default select-none">Details</span>
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const AVATAR = "https://randomuser.me/api/portraits/men/32.jpg";

// export default function ProfilePage() {
//   // Get user from Redux store (set by AuthInitializer)
//   const user = useSelector((state) => state.auth.user);
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     isDefault: false,
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchAddresses() {
//       setLoading(true);
//       try {
//         // Only fetch addresses if user is authenticated
//         if (user) {
//           const addrRes = await axios.get("http://localhost:8080/api/auth/users/me/addresses", {
//             withCredentials: true,
//           });
//           const addrData = addrRes.data;
//           setAddresses(Array.isArray(addrData) ? addrData : []);
//         } else {
//           setAddresses([]);
//         }
//       } catch (err) {
//         setAddresses([]);
//       }
//       setLoading(false);
//     }
//     fetchAddresses();
//   }, [user]);

//   const handleAddAddress = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");
//     try {
//       await axios.post("http://localhost:8080/api/auth/users/me/addresses", form, {
//         withCredentials: true,
//       });
//       setShowModal(false);
//       setForm({
//         street: "",
//         city: "",
//         state: "",
//         pincode: "",
//         country: "",
//         isDefault: false,
//       });
//       // Refetch addresses from backend to ensure latest
//       if (user) {
//         const addrRes = await axios.get("http://localhost:8080/api/auth/users/me/addresses", {
//           withCredentials: true,
//         });
//         const addrData = addrRes.data;
//         setAddresses(Array.isArray(addrData) ? addrData : []);
//       }
//     } catch (err) {
//       setError("Failed to add address. Please try again.");
//     }
//     setSubmitting(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
//         <div className="text-gray-500 text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa]">
//         <div className="text-red-500 text-lg">
//           User not found or not authenticated.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f6f8fa] px-3 py-6 flex justify-center">
//       <div className="w-full max-w-2xl space-y-6">
//         {/* ================= PROFILE HEADER ================= */}
//         <section className="bg-white rounded-xl border shadow-sm px-6 py-5 flex items-center gap-4">
//           <img
//             src={AVATAR}
//             alt="User Avatar"
//             className="w-16 h-16 rounded-full object-cover border"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               {user?.name || "Alex Johnson"}
//             </h2>
//             <p className="text-sm text-slate-500">
//               {user?.email || "alex.johnson@example.com"}
//             </p>
//           </div>
//         </section>

//         {/* ================= PERSONAL DETAILS (READ ONLY) ================= */}
//         <section className="bg-white rounded-xl border shadow-sm px-6 py-5">
//           <h3 className="text-sm font-semibold text-slate-800 mb-4">
//             Personal Information
//           </h3>
//           <div className="space-y-3">
//             <DetailRow label="Full Name" value={user?.name || "No Name"} />
//             <DetailRow label="Email" value={user?.email || "No Email"} />
//             <DetailRow label="Phone" value={user?.phone || "N/A"} />
//           </div>
//         </section>

//         {/* ================= ADDRESSES (ONLY EDITABLE SECTION) ================= */}
//         <section className="bg-white rounded-xl border shadow-sm px-6 py-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-semibold text-slate-800">
//               Saved Addresses
//             </h3>
//             <button
//               className="text-sm font-medium text-indigo-600 hover:underline"
//               onClick={() => setShowModal(true)}
//             >
//               + Add Address
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {addresses.length === 0 && (
//               <div className="col-span-2 text-gray-400 text-sm text-center py-4">
//                 No addresses found.
//               </div>
//             )}
//             {addresses.map((addr, idx) => (
//               <AddressCard
//                 key={addr.id || idx}
//                 title={addr.type || "Address"}
//                 address={`${addr.street || ""}${addr.city ? `, ${addr.city}` : ""}${addr.state ? `, ${addr.state}` : ""} ${addr.pincode || ""}\n${addr.country || ""}`}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Address Modal */}
//         {showModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
//               <button
//                 className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                 onClick={() => setShowModal(false)}
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <h4 className="text-lg font-semibold mb-4">Add New Address</h4>
//               {error && (
//                 <div className="text-red-500 text-sm mb-2">{error}</div>
//               )}
//               <form onSubmit={handleAddAddress} className="space-y-3">
               
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Street Address*
//                   </label>
//                   <input
//                     className="w-full border rounded px-2 py-1"
//                     value={form.street}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, street: e.target.value }))
//                     }
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1">
//                       City*
//                     </label>
//                     <input
//                       className="w-full border rounded px-2 py-1"
//                       value={form.city}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, city: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1">
//                       State*
//                     </label>
//                     <input
//                       className="w-full border rounded px-2 py-1"
//                       value={form.state}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, state: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1">
//                       PinCode*
//                     </label>
//                     <input
//                       className="w-full border rounded px-2 py-1"
//                       value={form.pincode}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, pincode: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1">
//                       Country*
//                     </label>
//                     <input
//                       className="w-full border rounded px-2 py-1"
//                       value={form.country}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, country: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-indigo-600 text-white rounded py-2 font-semibold mt-2 disabled:opacity-60"
//                   disabled={submitting}
//                 >
//                   {submitting ? "Adding..." : "Add Address"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */

// const DetailRow = ({ label, value }) => (
//   <div className="flex justify-between text-sm">
//     <span className="text-slate-500">{label}</span>
//     <span className="text-slate-900 font-medium">{value}</span>
//   </div>
// );

// const AddressCard = ({ title, address }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <div className="flex items-center justify-between mb-1">
//       <span className="font-medium text-slate-900">{title}</span>
//       <div className="flex gap-3 text-xs">

//         <button className="text-red-500 hover:underline">Delete</button>
//       </div>
//     </div>
//     <p className="text-slate-500 whitespace-pre-line leading-relaxed">
//       {address}
//     </p>
//   </div>
// );
