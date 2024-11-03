import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const openSans = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "La Veguita Click",
  description: "Productos de la huerta de La Veguita",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
