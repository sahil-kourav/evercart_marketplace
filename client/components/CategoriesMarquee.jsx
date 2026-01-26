import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-20">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4" >
                    {[...categories, ...categories, ...categories, ...categories].map((company, index) => (
                        <button
                            key={index}
                            className="px-7 py-2 bg-white/70 border border-emerald-100 shadow-md rounded-xl text-emerald-700 font-semibold text-xs sm:text-sm hover:bg-gradient-to-r hover:from-emerald-400 hover:to-sky-400 hover:text-white hover:shadow-lg active:scale-95 transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        >
                            <span className="drop-shadow-sm tracking-wide">{company}</span>
                        </button>
                    ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;