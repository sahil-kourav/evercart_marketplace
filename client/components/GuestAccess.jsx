"use client";

import { useRouter } from "next/navigation";

export default function GuestAccessLabel() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#3B2A1E] px-4 py-12">
      <div className="relative w-full max-w-md animate-[riseIn_0.5s_ease-out] motion-reduce:animate-none rounded-sm bg-[#D9BE93] p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Tape corners */}
        <div className="absolute -top-2 left-8 h-5 w-16 -rotate-6 bg-[#EDE3C8]/70" />
        <div className="absolute -top-2 right-8 h-5 w-16 rotate-6 bg-[#EDE3C8]/70" />

        <div className="border-2 border-dashed border-[#3B2A1E]/40 px-7 py-8 text-[#3B2A1E]">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B2A1E]/70">
            <span>EverCart Fulfillment</span>
            <span>Zone 4</span>
          </div>

          <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
            <span className="font-semibold">FROM:</span>
            <span>EverCart Warehouse</span>
            <span className="font-semibold">TO:</span>
            <span>You (not signed in)</span>
          </div>

          <div className="my-6 rotate-[-3deg] rounded border-[3px] border-[#C1272D] px-4 py-2 text-center">
            <p className="text-lg font-extrabold uppercase tracking-widest text-[#C1272D]">
              Access Held
            </p>
          </div>

          <p className="text-[13px] leading-relaxed text-[#3B2A1E]/80">
            This shipment is on hold. Sign in or create an account to release
            your catalog access, cart, and checkout.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full rounded-sm bg-[#3B2A1E] py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#EDE3C8] transition hover:bg-[#4A3626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2A1E]"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="w-full rounded-sm border-2 border-[#3B2A1E] py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3B2A1E] transition hover:bg-[#3B2A1E]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2A1E]"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div
              className="h-8 w-40"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #3B2A1E 0px, #3B2A1E 2px, transparent 2px, transparent 4px, #3B2A1E 4px, #3B2A1E 6px, transparent 6px, transparent 9px, #3B2A1E 9px, #3B2A1E 10px, transparent 10px, transparent 13px)",
              }}
            />
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#3B2A1E]/70">
              TRK 88213-GUEST
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(10px) rotate(-0.5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0); }
        }
      `}</style>
    </div>
  );
}