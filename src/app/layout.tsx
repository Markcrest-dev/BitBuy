import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import SessionProvider from "@/providers/SessionProvider";
import ToastManager from "@/components/providers/ToastManager";
import ModalManager from "@/components/providers/ModalManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ShopHub - Your One-Stop E-Commerce Platform",
  description: "Shop for household appliances, gadgets, clothing, sneakers, and everyday items at the best prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <ReactQueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastManager />
            <ModalManager />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
