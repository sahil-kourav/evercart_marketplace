// import { Outfit } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import StoreProvider from "@/app/StoreProvider";
// import "./globals.css";

// const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

// export const metadata = {
//     title: "VenDora. - Shop smarter",
//     description: "VenDora. - Shop smarter",
// };

// export default function RootLayout({ children }) {
//     return (
//         <html lang="en">
//             <body className={`${outfit.className} antialiased`}>
//                 <StoreProvider>
//                     <Toaster />
//                     {children}
//                 </StoreProvider>
//             </body>
//         </html>
//     );
// }

import { Toaster } from "react-hot-toast";
// import StoreProvider from "@/app/StoreProvider";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import AuthInitializer from "@/components/AuthInitializer";

export const metadata = {
  title: "evercart. - Shop smarter",
  description: "evercart. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-outfit antialiased">
        <StoreProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />

           <AuthInitializer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
