"use client";

import { PlusIcon, SquarePenIcon, Trash2Icon, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import AddressModal from "./AddressModal";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cartCleared } from "@/lib/features/cart/cartSlice";
import axios from "axios";

import {
  setAddresses,
  addAddress,
  removeAddress,
  setLoading,
} from "@/lib/features/address/addressSlice";
import OrderLoader from "./OrderLoader";

const OrderSummary = ({ totalPrice }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const router = useRouter();
  const dispatch = useDispatch();

  const { list: addressList, loading } = useSelector((state) => state.address);
  const cartState = useSelector((state) => state.cart);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const api = axios.create({
    // baseURL: "http://localhost:8080/api/auth",
    baseURL: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth`,
    withCredentials: true,
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses`,
          { withCredentials: true }
        );
        const list = res.data.addresses || [];

        dispatch(setAddresses(list));

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

  const handleSaveAddress = async (data) => {
    dispatch(setLoading(true));
    try {
      let res;

      res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses`,
        data,
        { withCredentials: true }
      );

      dispatch(addAddress(res.data.address));

      setSelectedAddress(res.data.address);
      toast.success("Address added successfully");

      setShowAddressModal(false);
    } catch (err) {
      toast.error("Failed to save address");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteAddress = async (id) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/auth/users/me/addresses/${id}`,
        { withCredentials: true }
      );
      dispatch(removeAddress(id));

      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }

      toast.success("Address deleted successfully");
    } catch {
      toast.error("Failed to delete address");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    if (placingOrder) return;
    setPlacingOrder(true);

    // Prepare order payload
    const orderPayload = {
      shippingAddress: {
        name: selectedAddress.name,
        email: selectedAddress.email,
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        country: selectedAddress.country,
        phone: selectedAddress.phone,
      },
      addressId: selectedAddress._id,
      paymentMethod,
      items: cartState.cart?.items || [],
      totalPrice,
    };

    try {
      // Create order
      const orderRes = await axios.post(
        // "http://localhost:8083/api/orders",
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API_URL}/api/orders`,
        orderPayload,
        { withCredentials: true },
      );
      const orderId = orderRes.data?.order?._id || orderRes.data?._id;
      if (!orderId) throw new Error("Order creation failed");

      // Payment
      let paymentRes;

      if (paymentMethod === "COD") {
        paymentRes = await axios.post(
          // `http://localhost:8084/api/payments/cod/${orderId}`,
          `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_API_URL}/api/payments/cod/${orderId}`,
          {},
          { withCredentials: true },
        );

        setShowLoader(true);

        setTimeout(() => {
          router.push("/orders");
          toast.success("Order placed successfully!");
        }, 3500);

      } else if (paymentMethod === "RAZORPAY") {
        const res = await loadRazorpay();

        if (!res) {
          return toast.error("Failed to load Razorpay SDK. Please try again.");
        }

        // Step 1: create payment on backend
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_API_URL}/api/payments/razorpay/${orderId}`,
          {},
          { withCredentials: true },
        );

        const payment = data.payment;

        // Step 2: open Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: payment.price.amount, // already in paise
          currency: payment.price.currency,

          name: "evercart store",
          description: "Order Payment",

          order_id: payment.razorpayOrderId, // IMPORTANT

          handler: async function (response) {
            try {
              await axios.post(
                // "http://localhost:8084/api/payments/verify",
                `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_API_URL}/api/payments/verify`,
                {
                  razorpayOrderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                },
                { withCredentials: true },
              );

              setShowLoader(true); // ✅ show loader AFTER payment

              setTimeout(() => {
                router.push("/orders");
                toast.success("Order placed successfully!");
              }, 3500);

            } catch (err) {
              console.error("Payment verification failed", err);
              toast.error("Payment verification failed");
            }
          },

          modal: {
            ondismiss: function () {
              toast.error("Payment cancelled.");
            },
          },

          prefill: {
            name: selectedAddress.name,
            email: selectedAddress.email,
            contact: selectedAddress.phone,
          },

          theme: {
            color: "#0f172a",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          console.log("Payment failed:", response);

          toast.error("Payment failed. Please try again.");

          router.push("/cart");
        });

        rzp.open();
      }
    } catch (err) {
      console.error("Order placement failed", err);
      toast.error("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="w-full max-w-lg lg:max-w-[360px] p-4 border rounded-2xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-slate-700">Payment Summary</h2>
      {/* PAYMENT */}
      <div className="mt-2 space-y-2">
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
            checked={paymentMethod === "RAZORPAY"}
            onChange={() => setPaymentMethod("RAZORPAY")}
          />
          Razorpay
        </label>
      </div>
      {/* ADDRESS */}
      <div className="mt-4 border-t border-slate-500 pt-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-slate-600">Address</p>

          <button
            onClick={() => {
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
                      {addr.phone}, {addr.email}
                    </p>

                    {/* ADDRESS */}
                    <p className="text-sm text-slate-500 leading-5">
                      {addr.street}, {addr.city}, {addr.state}, {addr.country},{" "}
                      {addr.pincode}
                    </p>
                  </div>

                  <div className="">
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
      <div className="py-4 border-t mt-4 border-slate-500">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 text-slate-600">
            <p>Subtotal:</p>
            <p>Shipping:</p>
          </div>

          <div className="flex flex-col gap-1 font-medium text-right">
            <p>
              {currency}
              {(totalPrice || 0).toLocaleString()}
            </p>
            <p>Free</p>
          </div>
        </div>
      </div>
      {/* TOTAL */}
      <div className="flex justify-between py-3 border-t border-slate-500 mt-1">
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
        {placingOrder
          ? paymentMethod === "COD"
            ? "Placing Order..."
            : "Opening Payment..."
          : paymentMethod === "COD"
            ? "Place Order"
            : "Pay Now"}
      </button>

      {/* Address Modal */}
      {showAddressModal && (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          onSave={handleSaveAddress}
        />
      )}
      {/*  Loader Animation */}
      <OrderLoader show={showLoader} paymentMethod={paymentMethod} />
      
    </div>
  );
};

export default OrderSummary;
