"use client";
import { Phone, Mail, MapPin, PhoneCall, MailCheck, Store, ArrowRight, Leaf } from "lucide-react";

export default function ContactUs() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            We're here to <br />
            <span className="text-green-700">help you shop smarter</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Evercart is built for people who love discovering the best products
            with confidence. Whether you have a question, need assistance, or
            want to share feedback — our team is always listening.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: <Phone size={18} />, label: "Phone", value: "+91-913-426-7890" },
              { icon: <Mail size={18} />, label: "Email", value: "evercart@gmail.com" },
              { icon: <MapPin size={18} />, label: "Location", value: "Indore, India" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-sm font-medium text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <div className="bg-green-50 rounded-2xl p-4 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/198/949/non_2x/girl-doing-online-shopping-by-smartphone-vector.jpg"
              alt="Person shopping online on a smartphone"
              className="w-full max-w-sm"
            />
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
            <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-800">We respond quickly</span> — typically within a few hours on business days.
            </p>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-10">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Ways to reach us</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <PhoneCall size={22} />,
              title: "Call us",
              desc: "Speak directly with our support team for fast help with orders, returns, or account issues.",
              cta: "+91-913-426-7890",
            },
            {
              icon: <MailCheck size={22} />,
              title: "Email us",
              desc: "Send us a detailed message anytime. We reply to every email, usually within a few hours.",
              cta: "evercart@gmail.com",
            },
            {
              icon: <Store size={22} />,
              title: "Visit us",
              desc: "Located in Indore, India. Stop by and meet the team in person for any complex queries.",
              cta: "Get directions",
            },
          ].map(({ icon, title, desc, cta }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-green-700">
                <ArrowRight size={14} />
                {cta}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOURS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Support Hours */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Support hours</p>
            {[
              { day: "Monday – Friday", time: "9 AM – 7 PM IST", open: true },
              { day: "Saturday", time: "10 AM – 5 PM IST", open: true },
              { day: "Sunday", time: "Closed", open: false },
            ].map(({ day, time, open }) => (
              <div key={day} className="flex justify-between items-center py-2.5 border-b border-slate-200 last:border-b-0">
                <span className="text-sm text-slate-500">{day}</span>
                {open ? (
                  <span className="text-sm font-medium text-slate-800">{time}</span>
                ) : (
                  <span className="text-xs font-medium bg-slate-100 text-slate-400 border border-slate-200 rounded-full px-3 py-0.5">
                    Closed
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Current status</p>
            {[
              { label: "Email response", value: "~2–4 hrs" },
              { label: "Phone wait time", value: "< 5 min" },
              { label: "Service quality", value: "Online" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-200 last:border-b-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="text-xs font-medium bg-green-100 text-green-700 rounded-full px-3 py-0.5">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center border-t border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-800">
          Let's build a better shopping experience together
        </h2>
        <p className="mt-4 text-lg text-slate-500">
          Reach out anytime — we're always just a message or call away.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-green-400 text-green-700 text-sm font-medium rounded-full px-5 py-2">
          <Leaf size={15} />
          Evercart — smart shopping starts here
        </div>
      </section>

    </main>
  );
}