"use client";

const steps = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];

const OrderTimeline = ({ status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between relative">

        {/* Background line */}
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gray-400 -translate-y-1/3" />

        {/* Progress line */}
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-black -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = index <= currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`text-[11px] mt-2 tracking-wide ${
                  isActive ? "text-gray-900 font-medium" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;