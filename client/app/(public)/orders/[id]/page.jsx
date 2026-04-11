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
} from "lucide-react";
import axios from "axios";

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_STEPS = [
  { key: "PENDING",    label: "Pending",    Icon: Clock        },
  { key: "PROCESSING", label: "Processing", Icon: PackageCheck },
  { key: "SHIPPED",    label: "Shipped",    Icon: Truck        },
  { key: "DELIVERED",  label: "Delivered",  Icon: CheckCircle2 },
];

const STATUS_STYLES = {
  PENDING:    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  PROCESSING: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  SHIPPED:    "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  DELIVERED:  "bg-green-50 text-green-700 ring-1 ring-green-200",
};

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

function OrderTimeline({ currentStatus }) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);

  const trackFillPct =
    currentIndex <= 0
      ? 0
      : (currentIndex / (STATUS_STEPS.length - 1)) * 100;

  return (
    <Card>
      <SectionLabel>Order progress</SectionLabel>
      <div className="relative flex items-start justify-between">
        <div className="absolute top-4 left-4 right-4 h-px bg-gray-200" />
        <div
          className="absolute top-4 left-4 h-px bg-gray-800 transition-all duration-700"
          style={{ width: `calc(${trackFillPct}% * ((100% - 2rem) / 100%))` }}
        />

        {STATUS_STEPS.map((step, i) => {
          const done   = i < currentIndex;
          const active = i === currentIndex;
          const { Icon } = step;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  done
                    ? "bg-gray-800 border-gray-800 text-white"
                    : active
                    ? "bg-white border-gray-800 text-gray-800"
                    : "bg-white border-gray-200 text-gray-300"
                }`}
              >
                {done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
              </div>
              <p
                className={`text-xs text-center leading-tight ${
                  done || active ? "text-gray-700 font-medium" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function OrderItems({ items }) {
  return (
    <div className="divide-y divide-gray-50">
      {items?.map((item, i) => (
        <div
          key={item._id ?? i}
          className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
        >
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
              <p className="text-sm text-gray-400 mt-0.5">
                Qty: {item.quantity}
              </p>
              <p className="text-sm text-gray-600 flex-shrink-0 md:hidden">
                {CURRENCY}
                {item.price?.amount?.toLocaleString()}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900 flex-shrink-0 sm:block hidden">
              {CURRENCY}
              {item.price?.amount?.toLocaleString()}
            </p>
        </div>
      ))}
    </div>
  );
}

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
        {name    && <p className="font-medium text-gray-800">{name}</p>}
        {email   && <p className="text-gray-500">{email}</p>}
        {phone   && <p className="text-gray-500">{phone}</p>}
        {street  && <p className="text-gray-500">{street}</p>}
        {(city || state) && <p className="text-gray-500">{[city, state].filter(Boolean).join(", ")}</p>}
        {(pincode || country) && <p className="text-gray-500">{[pincode, country].filter(Boolean).join(", ")}</p>}
      </div>
    </Card>
  );
}

function PaymentInfo({ method, status }) {
  return (
    <Card>
      <div className="flex gap-2 mb-1">
        <CreditCard size={14} className="text-gray-400" />
        <SectionLabel>Payment info</SectionLabel>
      </div>
      <div className="space-y-3">
        {[
          { label: "Payment Method", value: method },
          { label: "Payment Status", value: status },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">{value}
            </span>

          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { id } = useParams();
  const router  = useRouter();

  const [order,   setOrder  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

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

        console.log("Fetched order data:", data);
        const rawOrder = data.order ?? data;

        // Enrich items with product details in parallel
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

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-400">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        <p className="text-sm">Loading order…</p>
      </div>
    );
  }

  // ── Error state ──
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

  // ── Derived values ──
  const badgeClass =
    STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
  const itemCount = order.items?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-green-500 hover:text-green-800 transition mb-2"
        >
          <ArrowLeft size={15} />
          Back to orders
        </button>

        {/* Header */}
        <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Order details</h1>
            <p className="text-xs text-gray-400 font-mono mt-1">#{order._id}</p>
            <p className="text-sm text-gray-400 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span
            className={`self-start sm:self-center text-xs font-medium px-3 py-1.5 rounded-full ${badgeClass}`}
          >
            {order.status}
          </span>
        </Card>

        {/* Progress timeline */}
        <OrderTimeline currentStatus={order.status} />

        {/* Items */}
        <Card>
          <SectionLabel>Items ordered</SectionLabel>
          <OrderItems items={order.items} />

          {/* Summary row */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                Total
              </p>
              <p className="text-xl font-semibold text-gray-900">
                {CURRENCY}
                {order.totalPrice?.amount?.toLocaleString() ?? "—"}
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
  );
}