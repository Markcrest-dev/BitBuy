'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show header/footer on auth pages
  const isAuthPage = pathname?.startsWith('/login') ||
                     pathname?.startsWith('/register') ||
                     pathname?.startsWith('/forgot-password') ||
                     pathname?.startsWith('/reset-password')

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
