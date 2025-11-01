'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/vendor/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/vendor/dashboard/products', icon: ShoppingBagIcon },
  { name: 'Orders', href: '/vendor/dashboard/orders', icon: ChartBarIcon },
  { name: 'Payouts', href: '/vendor/dashboard/payouts', icon: CurrencyDollarIcon },
  { name: 'Settings', href: '/vendor/dashboard/settings', icon: Cog6ToothIcon },
];

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/vendor/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vendor Portal</h1>
                <p className="text-xs text-gray-500">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                      }
                    `}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats in Sidebar */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission Rate</span>
                  <span className="font-semibold text-gray-900">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Cut</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
