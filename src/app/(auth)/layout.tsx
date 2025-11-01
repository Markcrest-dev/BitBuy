import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | BitBuy",
  description: "Sign in or create an account to access BitBuy",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
