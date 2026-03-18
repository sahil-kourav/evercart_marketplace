"use client";

const OrderLoader = ({ show, paymentMethod }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-3xl px-10 py-12 w-80 text-center shadow-2xl"
        style={{ animation: "cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Animated icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-green-200"
            style={{ animation: "ringPulse 1.8s ease-out infinite" }} />
          <div className="absolute inset-0 rounded-full border-2 border-green-200"
            style={{ animation: "ringPulse 1.8s ease-out 0.6s infinite" }} />

          <div className="absolute inset-0 bg-green-50 rounded-full flex items-center justify-center"
            style={{ animation: "circlePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}>
            <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 18l7 7 13-13"
                stroke="#16a34a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 60,
                  strokeDashoffset: 60,
                  animation: "drawCheck 0.5s ease-out 0.55s forwards",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <p className="text-xl font-semibold text-gray-900 mb-2"
          style={{ animation: "fadeUp 0.4s ease 0.7s both" }}>
          {paymentMethod === "COD" ? "Order placed!" : "Payment successful!"}
        </p>

        <p className="text-sm text-gray-500 mb-6"
          style={{ animation: "fadeUp 0.4s ease 0.8s both" }}>
          {paymentMethod === "COD"
            ? "Your order is being prepared. It will be delivered soon."
            : "Thank you for your payment! Your order is being processed. It will be delivered soon."}
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full mb-5"
          style={{ animation: "fadeUp 0.4s ease 0.85s both" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {paymentMethod === "COD" ? "Cash on delivery" : "Online payment"}
        </div>

        {/* Timer */}
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden"
          style={{ animation: "fadeUp 0.4s ease 1s both" }}>
          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            style={{ animation: "timerDrain 3s linear 1.1s forwards", width: "100%" }} />
        </div>

        <p className="text-xs text-gray-400 mt-2.5"
          style={{ animation: "fadeUp 0.4s ease 1s both" }}>
          Redirecting to your orders...
        </p>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes circlePop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes timerDrain {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default OrderLoader;