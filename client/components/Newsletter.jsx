import React from "react";
import Title from "./Title";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-4 my-36">
      <Title
        title="Join Newsletter"
        description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
        visibleButton={false}
      />
      <form className="flex flex-col sm:flex-row w-full max-w-2xl items-center gap-4 mt-15 relative z-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-3">
        <input
          type="text"
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
          placeholder="Enter your email address"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow"
        >
          Submit
        </button>
      </form>

      {/* </div> */}
    </div>
  );
};

export default Newsletter;
