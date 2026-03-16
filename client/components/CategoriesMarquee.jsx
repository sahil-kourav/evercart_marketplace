import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
  return (
    <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-10">
      
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4">
        
        {[...categories, ...categories, ...categories, ...categories].map((category, index) => (
          
          <button
            key={index}
            className="
            px-6 py-2 
            bg-slate-50 
            border border-slate-200 
            rounded-full 
            text-slate-700 
            font-medium 
            text-xs sm:text-sm
            hover:bg-[#F5F5F5]
            hover:text-neutral-800
            hover:border-neutral-300
          
            active:scale-95
            transition-all duration-200
            "
          >
            {category}
          </button>

        ))}

      </div>

      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

    </div>
  );
};

export default CategoriesMarquee;