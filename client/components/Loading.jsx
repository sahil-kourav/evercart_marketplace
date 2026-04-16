'use client'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-6">

      {/* Spinner ring */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-green-500 animate-spin" />
      </div>

      {/* Label */}
      <p className="text-[13px] text-slate-400 font-medium tracking-wide animate-pulse">
        Loading…
      </p>

    </div>
  )
}

export default Loading