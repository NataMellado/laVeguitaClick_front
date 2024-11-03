"use client";
import { Nunito } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminSidebar";
import { CartProvider } from "@/context/CartContext";


const openSans = Nunito({
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={openSans.className}>
        <CartProvider>
          {pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
