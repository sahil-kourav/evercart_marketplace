import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            We’re here to <br />
            <span className="text-green-600">help you shop smarter</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Evercart is built for people who love discovering the best
            products with confidence. Whether you have a question, need
            assistance, or want to share feedback — our team is always
            listening.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="text-green-600" size={20} />
              <span className="font-medium">+91-913-426-7890</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="text-green-600" size={20} />
              <span className="font-medium">evercart@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="text-green-600" size={20} />
              <span className="font-medium">Indore, India</span>
            </div>
          </div>
        </div>

        {/* Right Content - Illustration or Info */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/198/949/non_2x/girl-doing-online-shopping-by-smartphone-vector.jpg"
            alt="Contact Us Illustration"
            className="w-full max-w-lg mb-6"
          />
          <div className="text-slate-600 text-center">
            <p className="text-lg font-semibold mb-2">We respond quickly!</p>
            <p>Reach out by phone, email, or visit us in Indore.</p>
          </div>
        </div>
      </section>


      {/* CLOSING */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-slate-800">
          Let’s build a better shopping experience together
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          Reach out anytime — we’re always just a message or call away.
        </p>

        <p className="mt-6 text-slate-500">
          💚 Evercart — Smart shopping starts here.
        </p>
      </section>
    </main>
  );
}
