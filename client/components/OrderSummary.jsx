// "use client";

// import { PlusIcon, SquarePenIcon, XIcon } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import AddressModal from "./AddressModal";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   setAddresses,
//   addAddress,
//   removeAddress,
//   setLoading,
//   setError,
// } from "@/lib/features/address/addressSlice";

// const OrderSummary = ({ totalPrice, items }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

//   const router = useRouter();

//   const dispatch = useDispatch();
//   const addressList = useSelector((state) => state.address.list);
//   const addressLoading = useSelector((state) => state.address.loading);

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   // Address API logic
//   const api = axios.create({
//     baseURL: "http://localhost:8080",
//     withCredentials: true,
//   });

//   // Fetch addresses
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       dispatch(setLoading(true));
//       try {
//         const res = await api.get("/api/auth/users/me/addresses");
//         dispatch(setAddresses(res.data.addresses || []));
//         dispatch(setLoading(false));
//       } catch (err) {
//         dispatch(setError("Failed to fetch addresses"));
//         dispatch(setLoading(false));
//       }
//     };
//     fetchAddresses();
//   }, [dispatch]);

//   // Add address
//   const handleAddAddress = async (data) => {
//     dispatch(setLoading(true));
//     try {
//       const res = await api.post("/api/auth/users/me/addresses", data);
//       dispatch(addAddress(res.data.address));
//       toast.success("Address added");
//       setShowAddressModal(false);
//       dispatch(setLoading(false));
//     } catch (err) {
//       dispatch(setError("Failed to add address"));
//       toast.error(err.response?.data?.message || "Failed to add address");
//       dispatch(setLoading(false));
//     }
//   };

//   // Delete address
//   const handleDeleteAddress = async (id) => {
//     dispatch(setLoading(true));
//     try {
//       await api.delete(`/api/auth/users/me/addresses/${id}`);
//       dispatch(removeAddress(id));
//       toast.success("Address deleted");
//       if (selectedAddress && selectedAddress._id === id) setSelectedAddress(null);
//       dispatch(setLoading(false));
//     } catch (err) {
//       dispatch(setError("Failed to delete address"));
//       toast.error("Failed to delete address");
//       dispatch(setLoading(false));
//     }
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     router.push("/orders");
//   };

//   return (
//     <div className="w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7">
//       <h2 className="text-xl font-medium text-slate-600">
//         Payment Summary
//       </h2>

//       <p className="text-slate-400 text-xs my-4">Payment Method</p>

//       <div className="flex gap-2 items-center">
//         <input
//           type="radio"
//           id="COD"
//           onChange={() => setPaymentMethod("COD")}
//           checked={paymentMethod === "COD"}
//           className="accent-gray-500"
//         />
//         <label htmlFor="COD" className="cursor-pointer">
//           COD
//         </label>
//       </div>

//       <div className="flex gap-2 items-center mt-1">
//         <input
//           type="radio"
//           id="STRIPE"
//           name="payment"
//           onChange={() => setPaymentMethod("STRIPE")}
//           checked={paymentMethod === "STRIPE"}
//           className="accent-gray-500"
//         />
//         <label htmlFor="STRIPE" className="cursor-pointer">
//           Stripe Payment
//         </label>
//       </div>

//       {/* ADDRESS */}
//       <div className="my-4 py-4 border-y border-slate-200 text-slate-400">
//         <p>Address</p>

//         {addressLoading ? (
//           <div>Loading addresses...</div>
//         ) : selectedAddress ? (
//           <div className="flex gap-2 items-center">
//             <p>
//               {selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}
//             </p>
//             <SquarePenIcon
//               onClick={() => setSelectedAddress(null)}
//               className="cursor-pointer"
//               size={18}
//             />
//             <XIcon
//               onClick={() => handleDeleteAddress(selectedAddress._id)}
//               className="cursor-pointer text-red-500"
//               size={18}
//             />
//           </div>
//         ) : (
//           <div>
//             {addressList.length > 0 && (
//               <select
//                 className="border border-slate-400 p-2 w-full my-3 outline-none rounded"
//                 onChange={(e) => setSelectedAddress(addressList[e.target.value])}
//               >
//                 <option value="">Select Address</option>
//                 {addressList.map((address, index) => (
//                   <option key={address._id} value={index}>
//                     {address.name}, {address.city}, {address.state}, {address.zip}
//                   </option>
//                 ))}
//               </select>
//             )}
//             <button
//               className="flex items-center gap-1 text-slate-600 mt-1"
//               onClick={() => setShowAddressModal(true)}
//             >
//               Add Address <PlusIcon size={18} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* PRICE */}
//       <div className="pb-4 border-b border-slate-200">
//         <div className="flex justify-between">
//           <div className="flex flex-col gap-1 text-slate-400">
//             <p>Subtotal:</p>
//             <p>Shipping:</p>
//           </div>

//           <div className="flex flex-col gap-1 font-medium text-right">
//             <p>{currency}{(totalPrice || 0).toLocaleString()}</p>
//             <p>Free</p>
//           </div>
//         </div>
//       </div>

//       {/* TOTAL */}
//       <div className="flex justify-between py-4">
//         <p>Total:</p>
//         <p className="font-medium text-right">
//           {currency}{(totalPrice || 0).toLocaleString()}
//         </p>
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={(e) =>
//           toast.promise(handlePlaceOrder(e), {
//             loading: "Placing Order...",
//           })
//         }
//         className="w-full bg-slate-700 text-white py-2.5 rounded hover:bg-slate-900 active:scale-95 transition-all"
//       >
//         Place Order
//       </button>

//       {showAddressModal && (
//         <AddressModal
//           setShowAddressModal={setShowAddressModal}
//           onSave={handleAddAddress}
//         />
//       )}
//     </div>
//   );
// };

// export default OrderSummary;

// "use client";

// import { DeleteIcon, LucideDelete, PlusIcon, SquarePenIcon, Trash2Icon, XIcon } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import AddressModal from "./AddressModal";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// import {
//   setAddresses,
//   addAddress,
//   removeAddress,
//   setLoading,
//   setError,
// } from "@/lib/features/address/addressSlice";

// const OrderSummary = ({ totalPrice }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { list: addressList, loading } = useSelector(
//     (state) => state.address
//   );

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddressModal, setShowAddressModal] = useState(false);

//   // ✅ FIXED BASE URL
//   const api = axios.create({
//     baseURL: "http://localhost:8080/api/auth",
//     withCredentials: true,
//   });

//   // ✅ FETCH ADDRESSES
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       dispatch(setLoading(true));
//       try {
//         const res = await api.get("/users/me/addresses");

//         console.log("FETCH RESPONSE:", res.data);

//         dispatch(setAddresses(res.data.addresses || res.data || []));
//       } catch (err) {
//         dispatch(setError("Failed to fetch addresses"));
//         toast.error("Failed to load addresses");
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchAddresses();
//   }, [dispatch]);

//   // ✅ ADD ADDRESS
//   const handleAddAddress = async (data) => {
//     dispatch(setLoading(true));
//     try {
//       const res = await api.post("/users/me/addresses", data);

//       console.log("ADD RESPONSE:", res.data);

//       dispatch(addAddress(res.data.address || data));

//       toast.success("Address added");
//       setShowAddressModal(false);
//     } catch (err) {
//       dispatch(setError("Failed to add address"));
//       toast.error(err.response?.data?.message || "Add failed");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   // ✅ DELETE ADDRESS
//   const handleDeleteAddress = async (id) => {
//     dispatch(setLoading(true));
//     try {
//       await api.delete(`/users/me/addresses/${id}`);

//       dispatch(removeAddress(id));

//       toast.success("Address deleted");

//       if (selectedAddress?._id === id) {
//         setSelectedAddress(null);
//       }
//     } catch {
//       toast.error("Delete failed");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   // ✅ PLACE ORDER
//   const handlePlaceOrder = (e) => {
//     e.preventDefault();

//     if (!selectedAddress) {
//       return toast.error("Please select address");
//     }

//     router.push("/orders");
//   };

//   return (
//     <div className="w-full max-w-lg lg:max-w-[340px] p-7 border rounded-xl">
//       <h2 className="text-xl font-medium">Payment Summary</h2>

//       {/* PAYMENT */}
//       <p className="text-sm mt-3">Payment Method</p>

//       <div className="flex gap-2 items-center">
//         <input
//           type="radio"
//           checked={paymentMethod === "COD"}
//           onChange={() => setPaymentMethod("COD")}
//         />
//         COD
//       </div>

//       <div className="flex gap-2 items-center">
//         <input
//           type="radio"
//           checked={paymentMethod === "STRIPE"}
//           onChange={() => setPaymentMethod("STRIPE")}
//         />
//         Stripe
//       </div>

//       {/* ADDRESS */}
//       <div className="my-4 border-y py-4">
//         <p>Address</p>

//         {loading ? (
//           <p>Loading...</p>
//         ) : selectedAddress ? (
//           <div className="flex items-center gap-2">
//             <p>
//               {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}
//             </p>

//             <SquarePenIcon
//               size={20}
//               onClick={() => setSelectedAddress(null)}
//               className="cursor-pointer"
//             />

//             <Trash2Icon
//               size={20}
//               onClick={() => handleDeleteAddress(selectedAddress._id)}
//               className="cursor-pointer text-red-500"
//             />
//           </div>
//         ) : (
//           <>
//             {addressList.length === 0 && (
//               <p className="text-sm text-gray-400">
//                 No address found
//               </p>
//             )}

//             {addressList.length > 0 && (
//               <select
//                 className="border p-2 w-full my-3"
//                 onChange={(e) => {
//                   const index = e.target.value;
//                   if (index !== "") {
//                     setSelectedAddress(addressList[index]);
//                   }
//                 }}
//               >
//                 <option value="">Select Address</option>

//                 {addressList.map((addr, index) => (
//                   <option key={addr._id} value={index}>
//                     {addr.street}, {addr.city}, {addr.state} {addr.pincode}
//                   </option>
//                 ))}
//               </select>
//             )}

//             <button
//               onClick={() => setShowAddressModal(true)}
//               className="flex items-center gap-1"
//             >
//               Add Address <PlusIcon size={18} />
//             </button>
//           </>
//         )}
//       </div>

//       {/* TOTAL */}
//       <div className="flex justify-between py-4">
//         <p>Total:</p>
//         <p>
//           {currency}
//           {(totalPrice || 0).toLocaleString()}
//         </p>
//       </div>

//       <button
//         onClick={handlePlaceOrder}
//         className="w-full bg-slate-700 text-white py-2 rounded"
//       >
//         Place Order
//       </button>

//       {showAddressModal && (
//         <AddressModal
//           setShowAddressModal={setShowAddressModal}
//           onSave={handleAddAddress}
//         />
//       )}
//     </div>
//   );
// };

// export default OrderSummary;

"use client";

import { PlusIcon, SquarePenIcon, Trash2Icon, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import AddressModal from "./AddressModal";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  setAddresses,
  addAddress,
  removeAddress,
  setLoading,
  setError,
} from "@/lib/features/address/addressSlice";

const OrderSummary = ({ totalPrice }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const router = useRouter();
  const dispatch = useDispatch();

  const { list: addressList, loading } = useSelector((state) => state.address);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null); // 🔥 edit state

  const api = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    withCredentials: true,
  });

  // ✅ FETCH
  useEffect(() => {
    const fetchAddresses = async () => {
      dispatch(setLoading(true));
      try {
        const res = await api.get("/users/me/addresses");
        const list = res.data.addresses || [];

        dispatch(setAddresses(list));

        // 🔥 auto select default or first
        const defaultAddr = list.find((a) => a.isDefault) || list[0];

        if (defaultAddr) setSelectedAddress(defaultAddr);
      } catch {
        toast.error("Failed to load addresses");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAddresses();
  }, [dispatch]);

  // ✅ ADD / EDIT
  const handleSaveAddress = async (data) => {
    dispatch(setLoading(true));
    try {
      let res;

      if (editAddress) {
        res = await api.patch(`/users/me/addresses/${editAddress._id}`, data);

        toast.success("Address updated");
      } else {
        // 🔥 ADD
        res = await api.post("/users/me/addresses", data);

        dispatch(addAddress(res.data.address));

        // 🔥 AUTO SELECT NEW ADDRESS
        setSelectedAddress(res.data.address);
        toast.success("Address added");
      }

      setShowAddressModal(false);
      setEditAddress(null);
    } catch (err) {
      toast.error("Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ DELETE
  const handleDeleteAddress = async (id) => {
    dispatch(setLoading(true));
    try {
      await api.delete(`/users/me/addresses/${id}`);
      dispatch(removeAddress(id));

      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }

      toast.success("Address deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    router.push("/orders");
  };

  return (
    <div className="w-full max-w-lg lg:max-w-[360px] p-6 border rounded-2xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-slate-700">Payment Summary</h2>

      {/* PAYMENT */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500">Payment Method</p>

        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={paymentMethod === "STRIPE"}
            onChange={() => setPaymentMethod("STRIPE")}
          />
          Stripe
        </label>
      </div>

      {/* ADDRESS */}
      <div className="mt-5 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-slate-600">Address</p>

          <button
            onClick={() => {
              setEditAddress(null);
              setShowAddressModal(true);
            }}
            className="flex items-center gap-1 text-sm text-blue-600"
          >
            <PlusIcon size={16} /> Add
          </button>
        </div>

        {loading ? (
          <p className="text-sm mt-3">Loading...</p>
        ) : addressList.length === 0 ? (
          <p className="text-sm text-gray-400 mt-2">No address found</p>
        ) : (
          <div className="mt-3 space-y-3">
            {addressList.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedAddress?._id === addr._id
                    ? "border-green-500 bg-green-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    {/* TOP: Name + Default Badge */}
                    <div className="flex items-center justify-between">
                      <p className="text-md font-semibold text-slate-700">
                        {addr.name}
                      </p>

                      {addr.isDefault && (
                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                          Default
                        </span>
                      )}
                    </div>

                    {/* CONTACT */}
                    <p className="text-sm text-slate-600">
                      {addr.phone}
                    </p>
                    <p className="text-sm text-slate-600">
                      {addr.email}
                    </p>

                    {/* ADDRESS */}
                    <p className="text-sm text-slate-600 leading-5">
                      {addr.street}, {addr.city}
                    </p>

                    <p className="text-sm text-slate-500">
                      {addr.state}, {addr.country} - {addr.pincode}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <SquarePenIcon
                      size={16}
                      className="cursor-pointer text-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditAddress(addr);
                        setShowAddressModal(true);
                      }}
                    />

                    <Trash2Icon
                      size={16}
                      className="cursor-pointer text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(addr._id);
                      }}
                    />
                  </div>
                </div>

                {selectedAddress?._id === addr._id && (
                  <CheckCircle size={16} className="text-green-600 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between py-5 border-t mt-5">
        <p className="font-medium">Total</p>
        <p className="font-semibold">
          {currency}
          {(totalPrice || 0).toLocaleString()}
        </p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900"
      >
        Place Order
      </button>

      {showAddressModal && (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          onSave={handleSaveAddress}
          initialData={editAddress}
        />
      )}
    </div>
  );
};

export default OrderSummary;
