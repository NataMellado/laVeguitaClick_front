"use client";
import { Nunito } from "next/font/google";
import "./globals.css";
import { redirect, usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import AdminSidebar from "@/components/AdminSidebar";
import { CartProvider } from "@/context/CartContext";
import { UserProvider, useUser } from "@/context/UserContext";

const openSans = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
    <html lang="en" className={isAdminRoute ? "overflow-hidden" : ""}>
      <body className={openSans.className} >
        <UserProvider>
          <CartProvider>
            {pathname.startsWith("/admin") ? (
              <UserContent>
                {children}
              </UserContent>
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

  if (loading) return <p>Cargando...</p>; // Muestra un mensaje de carga
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
