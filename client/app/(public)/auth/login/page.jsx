// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// // import axios from "axios";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     // setError(null);
//     // setLoading(true);

//     // axios
//     //   .post(
//     //     "http://localhost:8080/api/auth/login",
//     //     {
//     //       email,
//     //       password,
//     //     },
//     //     {
//     //       withCredentials: true,
//     //     }
//     //   )
//     //   .then((response) => {
//     //     console.log(response);
//     //     router.push("/"); // ✅ Next.js navigation
//     //   })
//     //   .catch((err) => {
//     //     setError(err?.message || "Login failed");
//     //   })
//     //   .finally(() => {
//     //     setLoading(false);
//     //   });
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#212121] p-4">
//       <div className="w-full max-w-4xl bg-[#212121] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        
//         {/* Left Section */}
//         <aside className="hidden md:flex md:w-2/5 flex-col gap-4 p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
//           <div className="w-28 h-28 rounded-lg bg-white/10 flex items-center justify-center" />
//           <h3 className="text-lg font-semibold">Welcome back</h3>
//           <p className="text-sm opacity-90">
//             Pick up where you left off — chat with your AI, access history, and more.
//           </p>
//         </aside>

//         {/* Right Section */}
//         <main className="w-full md:w-3/5 p-6 md:p-10">
//           <div className="mb-4">
//             <div className="text-indigo-600 font-bold">AI Buddy</div>
//             <h1 className="text-2xl font-semibold mt-2 text-gray-100">
//               Sign in to your account
//             </h1>
//             <p className="text-sm text-gray-300 mt-1">
//               Secure access to your chats and AI tools.
//             </p>
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Email */}
//             <div>
//               <label className="block text-sm text-gray-200 mb-2">
//                 Email*
//               </label>
//               <div className="flex items-center rounded-md border border-gray-700/40 px-2 py-1">
//                 <input
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-transparent text-gray-100 px-2 py-2 focus:outline-none placeholder-gray-400"
//                   type="email"
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm text-gray-200 mb-2">
//                 Password*
//               </label>
//               <div className="flex items-center rounded-md border border-gray-700/40 px-2 py-1">
//                 <input
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-transparent text-gray-100 px-2 py-2 focus:outline-none placeholder-gray-500"
//                   type="password"
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Error */}
//             {/* {error && (
//               <div className="text-sm text-red-500">{error}</div>
//             )} */}

//             {/* Submit */}
//             {/* <button
//               // disabled={loading}
//               type="submit"
//               className={`w-full py-2 px-4 
//                 ${
//                 loading
//                   ? "bg-indigo-400"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               } text-white rounded-md`}
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button> */}


//               <button
//               // disabled={loading}
//               type="submit"
//               className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
//             >
//               {/* {loading ? "Signing in..." : "Sign in"} */}
//               Sign in
//             </button>

//             <div className="flex items-center my-2">
//               <div className="flex-1 h-px bg-slate-700" />
//               <span className="px-3 text-sm text-gray-300">or</span>
//               <div className="flex-1 h-px bg-slate-700" />
//             </div>

//             <button className="w-full py-2 px-3 border border-gray-700/40 rounded-md text-sm text-gray-200">
//               Continue with Google
//             </button>
//           </form>

//           {/* Register Link */}
//           <div className="mt-6 text-center">
//             <Link
//               href="/auth/register"
//               className="text-sm text-indigo-600 hover:underline"
//             >
//               Create an account
//             </Link>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }










"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section */}
        <aside className="hidden md:flex md:w-2/5 flex-col gap-4 p-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
          <div className="w-28 h-28 rounded-lg bg-white/10 flex items-center justify-center" />
          <h3 className="text-lg font-semibold">Welcome back</h3>
          <p className="text-sm opacity-90">
            Pick up where you left off — chat with your AI, access history, and more.
          </p>
        </aside>

        {/* Right Section */}
        <main className="w-full md:w-3/5 p-6 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="text-indigo-600 font-bold">AI Buddy</div>
            <h1 className="text-2xl font-semibold mt-2 text-gray-900">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Secure access to your chats and AI tools.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email*
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password*
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google */}
            <button className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
              Continue with Google
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/register"
              className="text-sm text-indigo-600 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
