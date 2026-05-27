"use client";
import {
  Award,
  Rocket,
  Users,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Star,
  Package,
  TrendingUp,
} from "lucide-react";

const stats = [
  { value: "50+", label: "Happy Customers", icon: <Users size={20} /> },
  { value: "80+", label: "Verified Products", icon: <Star size={20} /> },
  { value: "80+", label: "Products Listed", icon: <Package size={20} /> },
  { value: "99.9%", label: "Secure Payments", icon: <ShieldCheck size={20} /> },
];

const features = [
  {
    icon: <Award size={22} />,
    title: "Quality First",
    desc: "Every seller is vetted, every product reviewed. We don't list it unless we'd buy it ourselves.",
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: <Rocket size={22} />,
    title: "Fast & Reliable",
    desc: "From checkout to doorstep — blazing fast delivery, painless returns, zero drama.",
    color: "bg-sky-50 text-sky-600",
    border: "border-sky-100",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure by Design",
    desc: "End-to-end encrypted payments and privacy-first data handling. Your trust is non-negotiable.",
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-100",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Seller Growth",
    desc: "Powerful analytics, smart inventory tools, and a community to grow your business.",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
];

const timeline = [
  {
    year: "2025",
    title: "The Spark",
    desc: "Two friends in Indore frustrated by clunky marketplaces — Evercart was sketched on a napkin.",
  },
  {
    year: "2026",
    title: "First Launch",
    desc: "Beta launched with 50 sellers and 200 products. Sold out in 3 days.",
  },
  {
    year: "2026",
    title: "Trust at Scale",
    desc: "Launched Secure Pay, real-time tracking, and our seller success program.",
  },
  {
    year: "2027",
    title: "What's Next",
    desc: "Going global. Same trust, same simplicity — now borderless.",
  },
];

function StatCard({ value, label, icon }) {
  return (
    <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
        {icon}
      </div>

      <p className="text-3xl font-bold text-slate-900 tracking-tight">
        {value}
      </p>

      <p className="text-sm text-slate-500 font-medium text-center">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, border }) {
  return (
    <div
      className={`group flex flex-col gap-4 p-6 bg-white rounded-2xl border ${border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-slate-800 text-lg mb-2">
          {title}
        </h4>

        <p className="text-sm text-slate-500 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, desc, isLast }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-green-200">
          {year.slice(2)}
        </div>

        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-green-200 to-slate-100 mt-2" />
        )}
      </div>

      <div className="pb-10">
        <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-1">
          {year}
        </p>

        <h4 className="font-semibold text-slate-800 mb-1">
          {title}
        </h4>

        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <main className="bg-white text-slate-800 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))]" />

        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-50 to-transparent rounded-full opacity-70 translate-x-1/4 -translate-y-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold tracking-wide uppercase mb-6">
            <MapPin size={12} />
            Founded in Indore, India
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-slate-900">
            Shopping that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">
              actually works.
            </span>
          </h1>

          <p className="mt-6 text-md text-slate-500 leading-relaxed max-w-3xl mx-auto">
            Evercart is a modern Indian marketplace built on one belief —
            buying online should feel good. Quality products, honest sellers,
            and zero compromise on trust.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button  className="px-7 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 transition shadow-lg shadow-green-200">
              Start Shopping
            </button>

            <button className="px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* WHY EVERCART */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-green-600 tracking-widest uppercase">
            Why Evercart
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Built different.{" "}
            <span className="text-green-600">On purpose.</span>
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We didn't just build another marketplace. We built the one we always wished existed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-slate-50 py-16">

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <span className="text-xs font-semibold text-green-600 tracking-widest uppercase">
              Our Journey
            </span>

            <h2 className="mt-3 text-4xl font-bold text-slate-900 leading-tight">
              From a napkin sketch <br /> to a national platform.
            </h2>

            <p className="mt-5 text-slate-500 leading-relaxed">
              Every great marketplace has a messy origin story. Ours started
              with two founders tired of bad UX, shady sellers, and checkout
              flows that felt like 2004.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 cursor-pointer group">
              Read the full story
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Right */}
          <div className="pt-2">
            {timeline.map((item, i) => (
              <TimelineItem
                key={item.year}
                {...item}
                isLast={i === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-4">

        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 overflow-hidden text-center">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(16,185,129,0.25),transparent)]" />

          <div className="relative">

            <p className="text-green-400 font-semibold text-sm tracking-widest uppercase mb-4">
              Our Mission
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
              Make great products accessible to every Indian home.
            </h2>

            <p className="mt-5 text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Big city or small town — everyone deserves a marketplace they can trust.
            </p>

            {/* FEATURES */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap">
              <span>✔ Trusted sellers</span>
              <span>✔ Secure payments</span>
              <span>✔ Fast delivery</span>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">

              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 transition shadow-lg shadow-green-900/30">
                Join the Community
                <ArrowRight size={16} />
              </button>

              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-600 text-slate-200 font-semibold hover:border-slate-400 hover:text-white transition">
                Sell on Evercart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
     <section className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>💚 <span className="font-bold text-green-600">Evercart</span> — Where technology meets trust.</p>
          <p>Built in Indore, trusted across India.</p>
        </div>
      </section>

    </main>
  );
}