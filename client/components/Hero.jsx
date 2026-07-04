'use client'
import { ArrowRightIcon } from 'lucide-react'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import React from 'react'

// Display + data fonts — this pairing (a tight geometric grotesk + a mono)
// is what gives the "spec sheet" feel its edge. Inter/system-ui carries body copy.
const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-display' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

// Reusable corner-bracket frame — the signature motif tying every panel together,
// like crop marks on a viewfinder or a technical drawing.
const Brackets = () => (
    <>
        <span className='pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#10151B]/30 group-hover:border-[#FF7A33]/70 transition-colors' />
        <span className='pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#10151B]/30 group-hover:border-[#FF7A33]/70 transition-colors' />
        <span className='pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#10151B]/30 group-hover:border-[#FF7A33]/70 transition-colors' />
        <span className='pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#10151B]/30 group-hover:border-[#FF7A33]/70 transition-colors' />
    </>
)

const DeviceSchematic = () => (
    <svg viewBox='0 0 320 300' className='w-full max-w-[280px] sm:max-w-sm'>
        <circle cx='160' cy='150' r='128' fill='none' stroke='#2B5876' strokeOpacity='0.25' strokeDasharray='2 8' strokeWidth='1.5' />

        {/* measurement line */}
        <line x1='118' y1='38' x2='202' y2='38' stroke='#10151B' strokeOpacity='0.4' strokeWidth='1' />
        <line x1='118' y1='33' x2='118' y2='43' stroke='#10151B' strokeOpacity='0.4' strokeWidth='1' />
        <line x1='202' y1='33' x2='202' y2='43' stroke='#10151B' strokeOpacity='0.4' strokeWidth='1' />
        <text x='160' y='28' textAnchor='middle' fontFamily='monospace' fontSize='9' fill='#10151B' fillOpacity='0.5'>148MM</text>

        {/* phone body */}
        <rect x='118' y='46' width='84' height='176' rx='16' fill='#F4F6F1' stroke='#10151B' strokeWidth='2' />
        <rect x='128' y='58' width='64' height='140' rx='6' fill='none' stroke='#2B5876' strokeWidth='1.5' />
        <line x1='128' y1='176' x2='192' y2='176' stroke='#2B5876' strokeOpacity='0.5' strokeWidth='1' strokeDasharray='3 4' />
        <text x='160' y='190' textAnchor='middle' fontFamily='monospace' fontSize='7' fill='#2B5876'>SCREEN_ON</text>
        <circle cx='160' cy='206' r='3' fill='none' stroke='#10151B' strokeWidth='1.5' />
        <circle cx='160' cy='52' r='1.5' fill='#10151B' />

        {/* exploded leader line to earbud */}
        <line x1='202' y1='90' x2='250' y2='70' stroke='#10151B' strokeOpacity='0.35' strokeWidth='1' strokeDasharray='2 4' />
        <g>
            <ellipse cx='262' cy='62' rx='14' ry='18' fill='#F4F6F1' stroke='#10151B' strokeWidth='2' />
            <path d='M262 46 q10 -6 8 6' fill='none' stroke='#10151B' strokeWidth='2' strokeLinecap='round' />
            <circle cx='262' cy='62' r='4' fill='#FF7A33' />
        </g>
        <text x='262' y='92' textAnchor='middle' fontFamily='monospace' fontSize='7' fill='#10151B' fillOpacity='0.5'>UNIT_02</text>

        {/* second exploded earbud, lower */}
        <line x1='118' y1='150' x2='70' y2='190' stroke='#10151B' strokeOpacity='0.35' strokeWidth='1' strokeDasharray='2 4' />
        <g>
            <ellipse cx='58' cy='202' rx='14' ry='18' fill='#F4F6F1' stroke='#10151B' strokeWidth='2' />
            <path d='M58 186 q10 -6 8 6' fill='none' stroke='#10151B' strokeWidth='2' strokeLinecap='round' />
            <circle cx='58' cy='202' r='4' fill='#2B5876' />
        </g>
        <text x='58' y='232' textAnchor='middle' fontFamily='monospace' fontSize='7' fill='#10151B' fillOpacity='0.5'>UNIT_02</text>

        {/* corner registration marks */}
        <path d='M40 40 h10 M40 40 v10' stroke='#10151B' strokeOpacity='0.3' strokeWidth='1.5' />
        <path d='M280 260 h-10 M280 260 v-10' stroke='#10151B' strokeOpacity='0.3' strokeWidth='1.5' />
    </svg>
)

const StarMark = () => (
    <svg viewBox='0 0 100 100' className='w-20 h-20 sm:w-24 sm:h-24 relative z-10'>
        <circle cx='50' cy='50' r='44' fill='none' stroke='#2FA084' strokeOpacity='0.3' strokeDasharray='2 6' strokeWidth='1.5' />
        <path d='M50 22 L58 42 L80 42 L62 55 L69 76 L50 63 L31 76 L38 55 L20 42 L42 42 Z'
            fill='none' stroke='#2FA084' strokeWidth='2.5' strokeLinejoin='round' />
        <circle cx='50' cy='50' r='3' fill='#2FA084' />
    </svg>
)

const PercentMark = () => (
    <svg viewBox='0 0 100 100' className='w-20 h-20 sm:w-24 sm:h-24 relative z-10'>
        <circle cx='50' cy='50' r='44' fill='none' stroke='#2B5876' strokeOpacity='0.3' strokeDasharray='2 6' strokeWidth='1.5' />
        <rect x='26' y='30' width='48' height='40' rx='6' fill='none' stroke='#2B5876' strokeWidth='2.5' />
        <circle cx='38' cy='42' r='4' fill='none' stroke='#2B5876' strokeWidth='2' />
        <circle cx='62' cy='58' r='4' fill='none' stroke='#2B5876' strokeWidth='2' />
        <line x1='38' y1='58' x2='62' y2='42' stroke='#2B5876' strokeWidth='2' strokeLinecap='round' />
    </svg>
)

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className={`${display.variable} ${mono.variable} font-sans mx-auto max-w-7xl px-4 lg:px-6 my-5`}>
            <div className='grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-5'>

                {/* Main panel */}
           <div className="relative flex-1 flex flex-col justify-start bg-[#F4F6F1] border border-[#10151B]/10 rounded-sm overflow-hidden group xl:min-h-[420px]">
    <Brackets />

    <div className="relative z-10 flex max-lg:flex-col-reverse items-center gap-4 sm:gap-6 p-4 sm:p-14 h-full">

        {/* Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-wider text-[#2B5876] border border-[#2B5876]/30 bg-white/70 backdrop-blur-sm px-3 py-1.5 w-fit uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A33] animate-pulse" />
                Free shipping // orders $50+
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-[2rem] leading-none sm:text-6xl font-bold tracking-tight text-[#10151B] mt-4 sm:mt-6 max-w-md">
                Gadgets you'll
                <br />
                actually trust.
            </h2>

            <div className="font-mono text-[11px] sm:text-sm text-[#10151B]/60 mt-5 sm:mt-10 flex items-baseline gap-3 w-full max-w-[240px] sm:max-w-sm uppercase tracking-wide">
                <span>Starting_at</span>

                <span className="flex-1 border-b border-dotted border-[#10151B]/30" />

                <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#10151B] normal-case tracking-normal">
                    {currency} 5K
                </span>
            </div>

            <button className="font-mono text-[11px] sm:text-sm tracking-wide uppercase bg-[#10151B] text-[#F4F6F1] px-5 py-3 sm:px-8 sm:py-4 mt-6 sm:mt-10 rounded-sm inline-flex items-center gap-2 hover:bg-[#FF7A33] hover:gap-3 active:scale-[0.98] transition-all">
                View collection
                <ArrowRightIcon size={16} />
            </button>
        </div>

        {/* Image */}
        <div className="relative flex-1 flex justify-center items-center w-full max-w-[280px] sm:max-w-none">
            <DeviceSchematic />

            <span className="hidden sm:block absolute bottom-0 left-2 font-mono text-[10px] tracking-widest text-[#10151B]/40 uppercase -rotate-90 origin-left">
                unit_01 // in stock
            </span>
        </div>

    </div>
</div>

                {/* Side cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full'>
                    <div className='relative flex-1 flex items-center justify-between w-full bg-[#EAF2F0] border border-[#10151B]/10 rounded-sm p-6 px-7 sm:px-8 group overflow-hidden'>
                        <Brackets />
                        <div className='relative z-10'>
                            <p className='font-mono text-[11px] tracking-wider text-[#2FA084] uppercase'>Catalog // 01</p>
                            <p className='font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#10151B] mt-2 max-w-40'>Best products</p>
                            <p className='font-mono text-xs uppercase tracking-wide flex items-center gap-1 mt-4 text-[#10151B]/70 group-hover:text-[#FF7A33] transition-colors'>
                                View_all <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={14} />
                            </p>
                        </div>
                        <StarMark />
                    </div>

                    <div className='relative flex-1 flex items-center justify-between w-full bg-[#E7EEF3] border border-[#10151B]/10 rounded-sm p-6 px-7 sm:px-8 group overflow-hidden'>
                        <Brackets />
                        <div className='relative z-10'>
                            <p className='font-mono text-[11px] tracking-wider text-[#2B5876] uppercase'>Catalog // 02</p>
                            <p className='font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#10151B] mt-2 max-w-40'>20% discounts</p>
                            <p className='font-mono text-xs uppercase tracking-wide flex items-center gap-1 mt-4 text-[#10151B]/70 group-hover:text-[#FF7A33] transition-colors'>
                                View_all
                                <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={14} />
                            </p>
                        </div>
                        <PercentMark />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero