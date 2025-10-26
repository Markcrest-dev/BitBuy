import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import SessionProvider from "@/providers/SessionProvider";
import ToastManager from "@/components/providers/ToastManager";
import ModalManager from "@/components/providers/ModalManager";
import PWAInstallPrompt from "@/components/pwa/PWAInstallPrompt";
import ComparisonBar from "@/components/product/ComparisonBar";
import ChatAssistant from "@/components/ChatAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: "BitBuy - Your Premium E-Commerce Destination",
    template: "%s | BitBuy"
  },
  description: "Shop for household appliances, gadgets, clothing, sneakers, and everyday items at the best prices with BitBuy. Free shipping on orders over $50!",
  keywords: ["ecommerce", "online shopping", "electronics", "clothing", "home goods", "shoes", "beauty products", "sports equipment", "BitBuy"],
  authors: [{ name: "BitBuy" }],
  creator: "BitBuy",
  publisher: "BitBuy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "BitBuy",
    title: "BitBuy - Your Premium E-Commerce Destination",
    description: "Shop for household appliances, gadgets, clothing, sneakers, and everyday items at the best prices. Free shipping on orders over $50!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BitBuy - Premium E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBuy - Your Premium E-Commerce Destination",
    description: "Shop for household appliances, gadgets, clothing, sneakers, and everyday items at the best prices.",
    images: ["/og-image.jpg"],
    creator: "@bitbuy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="/register-sw.js" defer />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <ReactQueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastManager />
            <ModalManager />
            <PWAInstallPrompt />
            <ComparisonBar />
            <ChatAssistant />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
