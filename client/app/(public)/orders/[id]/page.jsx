"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  PackageCheck,
  Truck,
  MapPin,
  CreditCard,
  X,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  PENDING:    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  PROCESSING: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  SHIPPED:    "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  DELIVERED:  "bg-green-50 text-green-700 ring-1 ring-green-200",
  CANCELLED:  "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const NORMAL_STEPS = [
  { key: "PENDING",    label: "Pending",    Icon: Clock        },
  { key: "PROCESSING", label: "Processing", Icon: PackageCheck },
  { key: "SHIPPED",    label: "Shipped",    Icon: Truck        },
  { key: "DELIVERED",  label: "Delivered",  Icon: CheckCircle2 },
];

const CANCEL_STEPS = [
  { key: "PENDING",    label: "Pending",    Icon: Clock        },
  { key: "PROCESSING", label: "Processing", Icon: PackageCheck },
  { key: "SHIPPED",    label: "Shipped",    Icon: Truck        },
  { key: "CANCELLED",  label: "Cancelled",  Icon: X            },
];

// Orders can only be cancelled before shipping
const CANCELLABLE_STATUSES = ["PENDING", "PROCESSING"];

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
      {children}
    </p>
  );
}

// ─── Cancel Confirm Modal ─────────────────────────────────────────────────────

function CancelModal({ onConfirm, onClose, loading, error }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
     <div
  className="bg-white rounded-2xl w-full max-w-sm border border-gray-100 overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
  {/* Red top bar */}
  <div className="h-[3px] bg-red-500" />

  <div className="p-6">
    {/* Header row — icon + title + subtitle */}
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-[10px] bg-red-50 flex items-center justify-center flex-shrink-0">
        <AlertTriangle size={16} className="text-red-700" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-none mb-1">Cancel this order?</p>
        <p className="text-xs text-gray-400">This action cannot be undone.</p>
      </div>
    </div>

    {/* Info note */}
    <div className="border-l-[3px] border-amber-400 bg-gray-50 rounded-r-lg px-3 py-2.5 mb-5">
      <p className="text-xs text-gray-500 leading-relaxed">
        Cancellation is only allowed while the order is{" "}
        <span className="font-medium text-gray-700">
           pending or processing  
        </span>.
      </p>
    </div>

    {/* API error */}
    {error && (
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50
        text-red-600 text-xs font-medium mb-4">
        <AlertTriangle size={12} className="flex-shrink-0" />
        {error}
      </div>
    )}

    {/* Buttons */}
    <div className="flex gap-2">
      <button
        onClick={onClose}
        disabled={loading}
        className="flex-1 py-2.5 text-sm font-medium border border-gray-200 rounded-xl
          text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
      >
        Keep order
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex-1 py-2.5 text-sm font-medium rounded-xl bg-red-500
          hover:bg-red-600 text-white transition disabled:opacity-60
          flex items-center justify-center gap-1.5"
      >
        {loading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Cancelling…
          </>
        ) : (
          <>
            <X size={13} />
            Yes, cancel
          </>
        )}
      </button>
    </div>
  </div>
</div>
    </div>
  );
}

// ─── OrderTimeline ────────────────────────────────────────────────────────────

function OrderTimeline({ currentStatus }) {
  const isCancelled = currentStatus === "CANCELLED";
  const isDelivered = currentStatus === "DELIVERED";
  const steps = isCancelled ? CANCEL_STEPS : NORMAL_STEPS;
  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  const progressPct =
    currentIndex <= 0 ? 0 : (currentIndex / (steps.length - 1)) * 100;

  const lineColor = isCancelled
    ? "bg-gray-200"        // ← grey line when cancelled
    : isDelivered
    ? "bg-green-500"
    : "bg-gray-800";

  return (
    <Card>
      <SectionLabel>Order progress</SectionLabel>

      <div className="relative flex items-start justify-between">
        <div className="absolute top-4 left-4 right-4 h-px bg-gray-200" />
        <div
          className={`absolute top-4 left-4 h-px transition-all duration-700 ${lineColor}`}
          style={{ width: `calc(${progressPct}% * ((100% - 2rem) / 100%))` }}
        />

        {steps.map((step, i) => {
          const done = i < currentIndex || (isDelivered && i === currentIndex);
          const active = i === currentIndex && !isDelivered;
          const isLastCancelled = isCancelled && i === steps.length - 1;
          const { Icon } = step;

          // ── NEW: all dots go muted when cancelled, except the last one ──
          const dotStyle = isLastCancelled
            ? "bg-red-50 border-red-300 text-red-400"
            : isCancelled
            ? "bg-gray-50 border-gray-200 text-gray-300"   // ← muted
            : done
            ? "bg-green-500 border-green-500 text-white"
            : active
            ? "bg-white border-gray-800 text-gray-800"
            : "bg-white border-gray-200 text-gray-300";

          const labelStyle = isLastCancelled
            ? "text-red-400 font-medium"
            : isCancelled
            ? "text-gray-300"                              // ← muted
            : done
            ? "text-green-600 font-medium"
            : active
            ? "text-gray-800 font-medium"
            : "text-gray-400";

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${dotStyle}`}
              >
                {done && !isCancelled ? (
                  <CheckCircle2 size={14} />
                ) : isLastCancelled ? (
                  <X size={14} />
                ) : (
                  <Icon size={14} />
                )}
              </div>
              <p className={`text-xs text-center leading-tight ${labelStyle}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {isDelivered && (
        <div className="mt-5 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 text-green-700 text-xs font-medium">
          <CheckCircle2 size={14} className="flex-shrink-0" />
          Your order was delivered successfully.
        </div>
      )}
      {isCancelled && (
        <div className="mt-5 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 text-red-400 text-xs font-medium">
          <X size={14} className="flex-shrink-0" />
          This order has been cancelled.
        </div>
      )}
    </Card>
  );
}


// ─── OrderItems ───────────────────────────────────────────────────────────────

function OrderItems({ items }) {
  return (
    <div className="divide-y divide-gray-50">
      {items?.map((item, i) => (
        <div key={item._id ?? i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
          <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            {item.product?.images?.[0]?.url && (
              <Image
                src={item.product.images[0].url}
                alt={item.product.title ?? "Product"}
                fill
                className="object-contain p-1"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {item.product?.title || "Product"}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">Qty: {item.quantity}</p>
            <p className="text-sm text-gray-600 flex-shrink-0 md:hidden">
              {CURRENCY}{item.price?.amount?.toLocaleString()}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900 flex-shrink-0 sm:block hidden">
            {CURRENCY}{item.price?.amount?.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── DeliveryAddress ──────────────────────────────────────────────────────────

function DeliveryAddress({ address }) {
  if (!address) return null;
  const { name, email, phone, street, city, state, pincode, country } = address;
  return (
    <Card>
      <div className="flex gap-2 mb-1">
        <MapPin size={14} className="text-gray-400" />
        <SectionLabel>Delivery address</SectionLabel>
      </div>
      <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
        {name   && <p className="font-medium text-gray-800">{name}</p>}
        {email  && <p className="text-gray-500">{email}</p>}
        {phone  && <p className="text-gray-500">{phone}</p>}
        {street && <p className="text-gray-500">{street}</p>}
        {(city || state) && (
          <p className="text-gray-500">{[city, state].filter(Boolean).join(", ")}</p>
        )}
        {(pincode || country) && (
          <p className="text-gray-500">{[pincode, country].filter(Boolean).join(", ")}</p>
        )}
      </div>
    </Card>
  );
}

// ─── PaymentInfo ──────────────────────────────────────────────────────────────

function PaymentInfo({ method, status }) {
  return (
    <Card>
      <div className="flex gap-2 mb-1">
        <CreditCard size={14} className="text-gray-400" />
        <SectionLabel>Payment info</SectionLabel>
      </div>
      <div className="space-y-3">
        {[
          { label: "Payment method", value: method },
          { label: "Payment status", value: status },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { id }  = useParams();
  const router  = useRouter();

  const [order,       setOrder      ] = useState(null);
  const [loading,     setLoading    ] = useState(true);
  const [error,       setError      ] = useState(null);
  const [showModal,   setShowModal  ] = useState(false);
  const [cancelling,  setCancelling ] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(
          `http://localhost:8083/api/orders/${id}`,
          { withCredentials: true },
        );

        const rawOrder = data.order ?? data;

        const itemsWithProducts = await Promise.all(
          rawOrder.items.map(async (item) => {
            try {
              const res = await axios.get(
                `http://localhost:8081/api/products/${item.productId}`,
              );
              return { ...item, product: res.data.product };
            } catch {
              return item;
            }
          }),
        );

        setOrder({ ...rawOrder, items: itemsWithProducts });
      } catch (err) {
        setError(err.response?.data?.message ?? "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // ── Cancel handler ──
  const handleCancelOrder = async () => {
    try {
      setCancelling(true);
      setCancelError(null);

      await axios.post(
        `http://localhost:8083/api/orders/${id}/cancel`,
        {},
        { withCredentials: true },
      );

      // Update status locally — no refetch needed
      setOrder((prev) => ({ ...prev, status: "CANCELLED" }));
      setShowModal(false);
    } catch (err) {
      setCancelError(
        err.response?.data?.message ?? "Could not cancel order. Please try again.",
      );
    } finally {
      setCancelling(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-400">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        <p className="text-sm">Loading order…</p>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Go back
        </button>
      </div>
    );
  }

  // ── Derived ──
  const badgeClass =
    STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
  const itemCount = order.items?.length ?? 0;
  const canCancel = CANCELLABLE_STATUSES.includes(order.status);

  return (
    <>
      {showModal && (
        <CancelModal
          onConfirm={handleCancelOrder}
          onClose={() => { setShowModal(false); setCancelError(null); }}
          loading={cancelling}
          error={cancelError}
        />
      )}

      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-4">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-green-500 hover:text-green-800 transition mb-2"
          >
            <ArrowLeft size={15} />
            Back to orders
          </button>

          {/* Header card */}
          <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Order details</h1>
              <p className="text-xs text-gray-400 font-mono mt-1">#{order._id}</p>
              <p className="text-sm text-gray-400 mt-1">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center flex-wrap">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${badgeClass}`}>
                {order.status}
              </span>

              {/* Cancel button — only visible for PENDING / PROCESSING */}
              {canCancel && (
                <button
                  onClick={() => { setCancelError(null); setShowModal(true); }}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-red-200
                    text-red-500 hover:bg-red-50 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </Card>

          {/* Timeline */}
          <OrderTimeline currentStatus={order.status} />

          {/* Items */}
          <Card>
            <SectionLabel>Items ordered</SectionLabel>
            <OrderItems items={order.items} />

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Total</p>
                <p className="text-xl font-semibold text-gray-900">
                  {CURRENCY}{order.totalPrice?.amount?.toLocaleString() ?? "—"}
                </p>
              </div>
            </div>
          </Card>

          {/* Address + Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DeliveryAddress address={order.shippingAddress} />
            <PaymentInfo method={order.paymentMethod} status={order.status} />
          </div>

        </div>
      </div>
    </>
  );
}