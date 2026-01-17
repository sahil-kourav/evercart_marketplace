// import React from "react";
// import { Award, Rocket, Users, ShieldCheck } from "lucide-react";

// export default function AboutUs() {
//   return (
//     <main className="bg-white">
//       {/* HERO */}
//       <section className="max-w-6xl mx-auto px-6 py-24 text-center">
//         <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
//           About <span className="text-green-600">Evercart</span>
//         </h1>

//         <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
//           Evercart is more than just an online marketplace — it’s a smarter way
//           to discover, compare, and shop for technology you can trust.
//           We bring together quality products, transparent pricing, and a
//           seamless experience for modern shoppers.
//         </p>

//         <img
//           src="https://illustrations.popsy.co/gray/online-shopping.svg"
//           alt="Evercart online shopping"
//           className="mx-auto mt-14 w-full max-w-lg"
//         />
//       </section>

//       {/* MISSION STATEMENT */}
//       <section className="bg-slate-50 border-t border-slate-100">
//         <div className="max-w-6xl mx-auto px-6 py-20 text-center">
//           <h2 className="text-3xl font-semibold text-slate-800">
//             Our Mission
//           </h2>
//           <p className="mt-6 text-lg text-slate-600 max-w-4xl mx-auto">
//             To empower customers and sellers with a secure, transparent, and
//             delightful shopping ecosystem — where technology meets trust and
//             growth feels effortless.
//           </p>
//         </div>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="py-24">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//           {/* Left */}
//           <div>
//             <h2 className="text-3xl font-semibold text-slate-800 mb-8">
//               Why choose Evercart?
//             </h2>

//             <ul className="space-y-6">
//               <li className="flex items-start gap-5">
//                 <Award className="text-green-600 mt-1" size={28} />
//                 <div>
//                   <h4 className="font-semibold text-slate-800">
//                     Curated Quality
//                   </h4>
//                   <p className="text-slate-600">
//                     Handpicked products from trusted brands to ensure reliability
//                     and long-term value.
//                   </p>
//                 </div>
//               </li>

//               <li className="flex items-start gap-5">
//                 <Rocket className="text-green-600 mt-1" size={28} />
//                 <div>
//                   <h4 className="font-semibold text-slate-800">
//                     Speed & Convenience
//                   </h4>
//                   <p className="text-slate-600">
//                     Fast delivery, smooth checkout, and hassle-free returns.
//                   </p>
//                 </div>
//               </li>

//               <li className="flex items-start gap-5">
//                 <ShieldCheck className="text-green-600 mt-1" size={28} />
//                 <div>
//                   <h4 className="font-semibold text-slate-800">
//                     Secure by Design
//                   </h4>
//                   <p className="text-slate-600">
//                     Safe payments, protected data, and reliable customer support.
//                   </p>
//                 </div>
//               </li>

//               <li className="flex items-start gap-5">
//                 <Users className="text-green-600 mt-1" size={28} />
//                 <div>
//                   <h4 className="font-semibold text-slate-800">
//                     Built for Sellers
//                   </h4>
//                   <p className="text-slate-600">
//                     Tools and opportunities for sellers to create, grow, and
//                     manage their own online stores.
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>

//           {/* Right */}
//           <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm text-slate-600 leading-relaxed">
//             <p className="mb-5">
//               Evercart was created with a simple belief — online shopping should
//               feel confident, transparent, and enjoyable.
//             </p>

//             <p className="mb-5">
//               Whether you’re a tech enthusiast searching for the latest gadgets
//               or a seller looking to reach new customers, Evercart provides the
//               platform to grow and succeed.
//             </p>

//             <p>
//               <span className="font-semibold text-slate-800">
//                 Founded in Indore, India
//               </span>
//               , Evercart proudly supports a growing community of smart shoppers
//               and innovative sellers across the country.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CLOSING */}
//       <section className="bg-slate-50 border-t border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 py-20 text-center">
//           <h2 className="text-3xl font-semibold text-slate-800">
//             Let’s shop smarter, together
//           </h2>
//           <p className="mt-4 text-lg text-slate-600">
//             💚 Evercart — where technology meets trust, speed, and simplicity.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }























import React from "react";
import { Award, Rocket, Users, ShieldCheck } from "lucide-react";

export default function AboutUs() {

  function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-100 text-green-600 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}

  return (
    <main className="bg-white text-slate-800">
      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
          About Evercart
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smarter shopping for a{" "}
          <span className="text-green-600">smarter generation</span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Evercart is a modern marketplace built for people who value quality,
          transparency, and speed. From the latest gadgets to everyday
          essentials — we help you shop with confidence.
        </p>

      </section>

      {/* ================= STATS ================= */}
      <section className="border-t border-b border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10k+", label: "Happy Customers" },
            { value: "500+", label: "Verified Sellers" },
            { value: "2k+", label: "Products Listed" },
            { value: "99.9%", label: "Secure Payments" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-3xl font-bold text-green-600">
                {item.value}
              </p>
              <p className="text-sm text-slate-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

 
      
      <section className="relative bg-slate-50 py-24">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    
    {/* LEFT CONTENT */}
    <div>
      <span className="inline-block mb-3 text-sm font-semibold text-green-600 tracking-wide">
        WHY EVERCART
      </span>

      <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
        Shopping made simple, <br />
        <span className="text-green-600">smart & secure</span>
      </h2>

      <p className="text-slate-600 max-w-xl mb-10">
        Evercart is built to give you confidence in every purchase — from quality
        products to reliable delivery and secure payments.
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FeatureCard
          icon={<Award />}
          title="Quality First"
          desc="Carefully verified products from trusted sellers."
        />
        <FeatureCard
          icon={<Rocket />}
          title="Fast & Reliable"
          desc="Smooth checkout, quick delivery & easy returns."
        />
        <FeatureCard
          icon={<ShieldCheck />}
          title="Secure Shopping"
          desc="Your data & payments are protected end-to-end."
        />
        <FeatureCard
          icon={<Users />}
          title="Seller Friendly"
          desc="Powerful tools to grow and manage your store."
        />
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative max-w-md mx-auto">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl blur-2xl opacity-60" />

      <div className="relative bg-white rounded-3xl p-6 shadow-xl">
        <img
          src="https://illustrations.popsy.co/gray/shopping-cart.svg"
          alt="Evercart shopping experience"
          className="w-full h-64 object-contain"
        />
      </div>
    </div>
  </div>
</section>


      {/* ================= CLOSING ================= */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Built in India. Trusted everywhere.
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Founded in Indore, Evercart is growing with a community that believes
            in smarter choices and better technology.
          </p>

          <p className="mt-5 text-green-400 font-medium">
            💚 Evercart — Where technology meets trust
          </p>
        </div>
      </section>
    </main>
  );
}

/* ===== Small Feature Component ===== */
function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-slate-800">{title}</h4>
        <p className="text-slate-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}
