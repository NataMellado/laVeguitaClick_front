"use client";
import { Nunito } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminSidebar";


const openSans = Nunito({
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={openSans.className}>
        {pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}
        {children}
      </body>
    </html>
  );
}
