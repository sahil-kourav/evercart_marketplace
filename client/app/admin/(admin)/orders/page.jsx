'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import axios from "axios"
import { toast } from "react-hot-toast"

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$"

const STATUS_OPTIONS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]

const statusConfig = {
  PENDING:    { cls: "bg-amber-50 text-amber-700 border-amber-200"    },
  PROCESSING: { cls: "bg-blue-50 text-blue-700 border-blue-200"       },
  SHIPPED:    { cls: "bg-purple-50 text-purple-700 border-purple-200" },
  DELIVERED:  { cls: "bg-green-50 text-green-700 border-green-200"    },
  CANCELLED:  { cls: "bg-red-50 text-red-700 border-red-200"          },
}

// ── enrich order items with product details ──────────────────
const enrichOrderItems = async (items) => {
  return Promise.all(
    items.map(async (item) => {
      try {
        const res = await axios.get(
          // `http://localhost:8081/api/products/${item.productId}`
          `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/products/${item.productId}`,
         { withCredentials: true }
        )
        return { ...item, product: res.data.product }
      } catch {
        return item // product fetch fail hone pe original item return karo
      }
    })
  )
}

export default function StoreOrders() {
  const [orders,        setOrders]        = useState([])
  const [loading,       setLoading]       = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [updating,      setUpdating]      = useState(null)
  const [modalLoading,  setModalLoading]  = useState(false)

  // ── fetch all orders ─────────────────────────────────────
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        // "http://localhost:8083/api/orders/admin/all",
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API_URL}/api/orders/admin/all`,
        { withCredentials: true }
      )
      setOrders(res.data.orders || [])
    } catch {
      toast.error("Failed to fetch orders")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  // ── open modal + fetch product details for that order ────
  const openOrderDetail = async (order) => {
    setSelectedOrder(order)       // pehle order bina product ke dikhao
    setModalLoading(true)
    try {
      const enrichedItems = await enrichOrderItems(order.items || [])
      const enrichedOrder = { ...order, items: enrichedItems }
      setSelectedOrder(enrichedOrder)
    } catch {
      toast.error("Failed to load product details")
    } finally {
      setModalLoading(false)
    }
  }

  // ── update order status ──────────────────────────────────
  const updateOrderStatus = async (orderId, status) => {
    setUpdating(orderId)
    try {
      await axios.post(
        // `http://localhost:8083/api/orders/status/${orderId}`,
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_API_URL}/api/orders/status/${orderId}`,
        { status },
        { withCredentials: true }
      )
      // table mein locally update karo
      setOrders((prev) =>
        prev.map((o) => o._id === orderId ? { ...o, status } : o)
      )
      // modal open hai to wahan bhi sync karo
      setSelectedOrder((prev) =>
        prev?._id === orderId ? { ...prev, status } : prev
      )
      toast.success("Status updated")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status")
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  if (loading) return <Loading />

  return (
    <>
      <h1 className="text-2xl text-slate-500 mb-5">
        Store <span className="text-slate-800 font-medium">Orders</span>
      </h1>

      {orders.length === 0 ? (
        <p className="text-slate-500 text-sm">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <tr>
                {["#", "Customer", "Items", "Total", "Payment", "Status", "Date", ""].map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => {
                const s = statusConfig[order.status] ?? { cls: "bg-gray-100 text-gray-600 border-gray-200" }
                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">

                    <td className="px-4 py-3 text-green-600 font-medium">{index + 1}</td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800 leading-tight">{order.shippingAddress?.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {currency}{order.totalPrice?.amount?.toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        disabled={updating === order._id}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border
                          focus:outline-none focus:ring-2 focus:ring-indigo-300 transition
                          disabled:opacity-50 cursor-pointer ${s.cls}`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => openOrderDetail(order)}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800
                          hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Details →
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── ORDER DETAIL MODAL ── */}
   {selectedOrder && (
  <div
    onClick={() => setSelectedOrder(null)}
    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-2xl border border-gray-100 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/10"
    >

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-800 leading-tight">Order details</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">#{selectedOrder._id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border
            ${(statusConfig[selectedOrder.status] ?? { cls: "bg-gray-100 text-gray-600 border-gray-200" }).cls}`}>
            {selectedOrder.status}
          </span>
          <button
            onClick={() => setSelectedOrder(null)}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500 text-[13px]"
          >✕</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Customer */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Customer</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Name",    selectedOrder.shippingAddress?.name],
              ["Phone",   selectedOrder.shippingAddress?.phone],
              ["Email",   selectedOrder.shippingAddress?.email],
              ["Address", `${selectedOrder.shippingAddress?.street}, ${selectedOrder.shippingAddress?.city}, ${selectedOrder.shippingAddress?.state} - ${selectedOrder.shippingAddress?.pincode}`],
            ].map(([label, value]) => (
              <div
                key={label}
                className={`bg-gray-50 rounded-xl px-3 py-2.5 ${label === "Address" ? "col-span-2" : ""}`}
              >
                <p className="text-[10px] text-slate-400 mb-1">{label}</p>
                <p className="text-[13px] font-medium text-slate-700 leading-tight">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
            Items ({selectedOrder.items?.length ?? 0})
          </p>

          {modalLoading ? (
            <div className="flex flex-col gap-2">
              {selectedOrder.items?.map((_, i) => (
                <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-3 py-2.5 animate-pulse">
                  <div className="w-11 h-11 rounded-lg bg-gray-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-gray-100 rounded w-2/3" />
                    <div className="h-2 bg-gray-100 rounded w-1/3" />
                  </div>
                  <div className="h-4 bg-gray-100 rounded w-14" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedOrder.items?.length > 0 ? (
                selectedOrder.items.map((item, i) => (
                  <div
                    key={item._id ?? i}
                    className="flex items-center gap-3 border border-gray-100 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.product?.images?.[0]?.url ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.title || "Product"}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-slate-800 truncate">
                        {item.product?.title || "Product"}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{item.productId}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>

                    {/* Price */}
                    <p className="text-[13px] font-semibold text-slate-800 shrink-0">
                      {currency}{item.price?.amount?.toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[13px] text-slate-400">No items found.</p>
              )}
            </div>
          )}
        </div>


          {/* Summary */}
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-2.5">
            {[
              ["Payment Method",  selectedOrder.paymentMethod],
              ["Payment Status",     selectedOrder.isPaid ? "Paid" : "Not Paid"],
              ["Date",     new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })],
              ["Time",     new Date(selectedOrder.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[12px] text-slate-500">{label}</span>
                <span className="text-[12px] font-medium text-slate-700">{value}</span>
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-2.5 flex items-baseline justify-between">
              <span className="text-[12px] text-slate-500">
                Total Amount
              </span>
              <span className="text-[18px] font-semibold text-slate-900">
                {currency}{selectedOrder.totalPrice?.amount?.toLocaleString()}
              </span>
            </div>
        </div>

{/* Footer */}
<div className="flex items-center justify-between gap-3 pt-3.5 border-t border-gray-100">

  {/* Status control group */}
  <div className="flex items-center gap-2.5">
    <span className="text-[12px] text-slate-400 whitespace-nowrap">Update status</span>

    <div className="relative flex items-center">
      <select
        value={selectedOrder.status}
        disabled={updating === selectedOrder._id}
        onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
        className="text-[13px] font-medium pl-3 pr-8 py-1.5 rounded-lg border border-gray-200
          bg-white text-slate-700 appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300
          disabled:opacity-50 disabled:cursor-not-allowed transition min-w-[148px]"
      >
        {STATUS_OPTIONS.map((st) => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>
      {/* Chevron icon */}
      <svg className="absolute right-2.5 pointer-events-none text-slate-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>

  <button
    onClick={() => setSelectedOrder(null)}
    className="text-[13px] font-medium px-4 py-1.5 rounded-lg border border-gray-200
      bg-white hover:bg-gray-50 text-slate-700 transition whitespace-nowrap"
  >
    Close
  </button>
</div>
      </div>
    </div>
  </div>
)}
    </>
  )
}