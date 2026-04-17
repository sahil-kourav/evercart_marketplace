"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, authChecked } from "@/lib/features/auth/authSlice";
import AddressModal from "@/components/AddressModal";
import { Trash2Icon, CheckCircle, PlusIcon, PackageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

const statusConfig = {
  PENDING:    { label: "Pending",    cls: "bg-amber-50 text-amber-800"  },
  PROCESSING: { label: "Processing", cls: "bg-blue-50 text-blue-800"    },
  SHIPPED:    { label: "Shipped",    cls: "bg-purple-50 text-purple-800" },
  DELIVERED:  { label: "Delivered",  cls: "bg-green-50 text-green-800"  },
  CANCELLED:  { label: "Cancelled",  cls: "bg-red-50 text-red-800"      },
};

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // ── fetch user ───────────────────────────────────────────
  useEffect(() => {
    if (user) return;
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );
        dispatch(loginSuccess(res.data.user));
      } catch (err) {
        console.error("User fetch failed", err);
        dispatch(authChecked());
      }
    }
    fetchUser();
  }, [user, dispatch]);

  // ── fetch addresses ──────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    async function fetchAddresses() {
      setAddressLoading(true);
      try {
        const res = await axios.get(
          // "http://localhost:8080/api/auth/users/me/addresses",
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses`,
          { withCredentials: true },
        );
        const data = res.data;
        const addrArray = Array.isArray(data)
          ? data
          : Array.isArray(data.addresses)
            ? data.addresses
            : [];
        setAddresses(addrArray);
        setSelectedAddress(addrArray[0] || null);
      } catch (err) {
        console.error(err);
        setAddresses([]);
      }
      setAddressLoading(false);
    }
    fetchAddresses();
  }, [user]);

  // ── fetch orders ─────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    async function fetchOrders() {
      setOrdersLoading(true);
      try {
        const res = await axios.get(
          // "http://localhost:8083/api/orders/me", 
          `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API_URL}/api/orders/me`,
          {
          withCredentials: true,
        });
        const rawOrders = res.data.orders;

        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            const itemsWithProducts = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const r = await axios.get(
                    // `http://localhost:8081/api/products/${item.productId}`,
                    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/products/${item.productId}`,
                  );
                  return { ...item, product: r.data.product };
                } catch {
                  return item;
                }
              }),
            );
            return { ...order, items: itemsWithProducts };
          }),
        );

        setOrders(enrichedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  // ── address handlers ─────────────────────────────────────
  const handleSaveAddress = async (data) => {
    try {
      const res = await axios.post(
        // "http://localhost:8080/api/auth/users/me/addresses",
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses`,
        data,
        { withCredentials: true },
      );
      const newAddress = res.data.address;
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddress(newAddress);
      setShowAddressModal(false);
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(
        // `http://localhost:8080/api/auth/users/me/addresses/${id}`,
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses/${id}`,
        { withCredentials: true },
      );
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      if (selectedAddress?._id === id) setSelectedAddress(null);
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  // ── guards ────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">User not found. Please log in again.</p>
      </div>
    );
  }

  // ── render ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">

        {/* ── PROFILE HEADER ── */}
        <section className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
          <Image
            src={assets.AVATAR}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {user?.fullName
                ? `${user.fullName.firstName} ${user.fullName.lastName}`
                : "No Name"}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {user.email || "user@example.com"}
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              {user?.phone || "N/A"}
            </p>
          </div>
        </section>

        {/* ── ORDERS ── */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <PackageIcon size={16} className="text-gray-400" />
              <h3 className="text-[15px] font-semibold text-slate-800">My orders</h3>
            </div>
            {orders.length > 0 && (
              <span className="text-xs text-gray-400">{orders.length} orders</span>
            )}
          </div>

          {ordersLoading ? (
            <p className="text-sm text-gray-400 px-5 py-6">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-gray-400 px-5 py-6">No orders yet.</p>
          ) : (
            <>
              {/* column headers */}
              <div className="grid grid-cols-[1fr_56px_96px_88px_90px] px-5 py-2 bg-gray-50 border-b border-gray-100">
                {["Product(s)", "Items", "Date", "Total", "Status"].map((h, i) => (
                  <span
                    key={h}
                    className={`text-[11px] font-medium text-gray-400 uppercase tracking-wide ${
                      i === 0 ? "text-left" : i <= 2 ? "text-center" : "text-right"
                    }`}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* order rows */}
              {orders.map((order) => {
                const productNames = order.items
                  ?.map((item) => item.product?.title || "Product")
                  .join(", ");

                const s = statusConfig[order.status] ?? {
                  label: order.status,
                  cls: "bg-gray-100 text-gray-600",
                };

                return (
                  <div
                    key={order._id}
                    onClick={() => router.push(`/orders/${order._id}`)}
                    className="grid grid-cols-[1fr_56px_96px_88px_90px] items-center px-5 py-[13px] border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-b-0"
                  >
                    <p className="text-[13px] text-gray-800 truncate pr-3">
                      {productNames}
                    </p>
                    <p className="text-[13px] text-gray-500 text-center">
                      {order.items?.length ?? 0}
                    </p>
                    <p className="text-[12px] text-gray-400 text-center">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-[13px] font-medium text-gray-900 text-right">
                      {currency}
                      {order.totalPrice?.amount?.toLocaleString()}
                    </p>
                    <div className="flex justify-end">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${s.cls}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </section>

        {/* ── ADDRESSES ── */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Saved Addresses</h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
            >
              <PlusIcon size={16} /> Add New
            </button>
          </div>

          {addressLoading ? (
            <p className="text-sm text-gray-400">Loading addresses...</p>
          ) : addresses.length === 0 ? (
            <p className="text-sm text-gray-400">No address found. Add one now!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr)}
                  className={`p-4 border rounded-xl cursor-pointer transition-shadow hover:shadow-md ${
                    selectedAddress?._id === addr._id
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-slate-700">
                          {addr.name || "User"}
                        </p>
                        {addr.isDefault && (
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">
                        {addr.phone || "N/A"}
                        {addr.email ? `, ${addr.email}` : ""}
                      </p>
                      <p className="text-sm text-slate-500 leading-5">
                        {addr.street}, {addr.city}, {addr.state}, {addr.country} -{" "}
                        {addr.pincode}
                      </p>
                    </div>
                    <Trash2Icon
                      size={18}
                      className="cursor-pointer text-red-500 hover:text-red-600 transition flex-shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(addr._id);
                      }}
                    />
                  </div>
                  {selectedAddress?._id === addr._id && (
                    <CheckCircle size={18} className="text-green-600 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── ADDRESS MODAL ── */}
        {showAddressModal && (
          <AddressModal
            setShowAddressModal={setShowAddressModal}
            onSave={handleSaveAddress}
          />
        )}

      </div>
    </div>
  );
}