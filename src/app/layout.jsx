"use client";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { redirect, usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { CartProvider } from "../context/CartContext";
import { UserProvider, useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const openSans = Work_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <html lang="en" className={isAdminRoute ? "overflow-hidden" : ""}>
        <body className={openSans.className}>
          <UserProvider>
            <CartProvider>
              {pathname.startsWith("/admin") ? (
                <UserContent>{children}</UserContent>
              ) : (
                <>
                  <Navbar />
                  {children}
                </>
              )}
            </CartProvider>
          </UserProvider>
        </body>
      </html>
    </>
  );
}

function UserContent({ children }) {
  const { user, loading } = useUser();
  const [showSpinner, setShowSpinner] = useState(true);

  // Mostrar el spinner durante al menos 1 segundo
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 1000);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  if (showSpinner) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner2"></div>
      </div>
    );
  }

  return (
    <>
      {user && user.rol === "gerente" ? (
        <AdminSidebar />
      ) : (
        redirect("/ingresar")
      )}
      {children}
    </>
  );
}
