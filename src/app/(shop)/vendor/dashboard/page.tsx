'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface VendorStats {
  totalSales: number;
  pendingOrders: number;
  totalProducts: number;
  pendingPayouts: number;
  revenue: number;
  commission: number;
  netEarnings: number;
  status: string;
  businessName: string;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
  }>;
}

export default function VendorDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVendorStats();
  }, []);

  const fetchVendorStats = async () => {
    try {
      const response = await fetch('/api/vendor/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load stats');
      }
    } catch (err) {
      setError('Failed to load vendor stats');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">Application Status</h3>
        <p className="text-yellow-800 mb-4">{error}</p>
        <p className="text-sm text-yellow-700">
          Your vendor application is currently pending review. We'll notify you once it's been processed.
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">Failed to load vendor dashboard</p>
      </div>
    );
  }

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    APPROVED: 'bg-green-100 text-green-800 border-green-300',
    SUSPENDED: 'bg-red-100 text-red-800 border-red-300',
    REJECTED: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {stats.businessName}!</p>
      </div>

      {/* Status Badge */}
      {stats.status !== 'APPROVED' && (
        <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${statusColors[stats.status as keyof typeof statusColors]}`}>
          <ClockIcon className="h-5 w-5 mr-2" />
          <span className="font-medium">
            Account Status: {stats.status}
          </span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">
            ${stats.revenue.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Gross sales
          </p>
        </div>

        {/* Net Earnings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Net Earnings</h3>
          <p className="text-3xl font-bold text-green-600">
            ${stats.netEarnings.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            After 15% commission
          </p>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Products</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalProducts}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Active listings
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TruckIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Orders</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.pendingOrders}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Require attention
          </p>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
          Revenue Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Gross Sales</p>
            <p className="text-2xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Platform Commission (15%)</p>
            <p className="text-2xl font-bold text-red-600">-${stats.commission.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Your Net Earnings (85%)</p>
            <p className="text-2xl font-bold text-green-600">${stats.netEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Commission Split</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '85%' }}>
              <span className="text-xs text-white pl-2 leading-4">You: 85%</span>
            </div>
            <div className="bg-blue-500 h-full" style={{ width: '15%' }}>
              <span className="text-xs text-white pl-1 leading-4">Platform: 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No orders yet. Start selling to see your orders here!
          </p>
        ) : (
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Payouts Notice */}
      {stats.pendingPayouts > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Pending Payouts</h3>
          <p className="text-blue-800">
            You have <strong>${stats.pendingPayouts.toFixed(2)}</strong> in pending payouts.
            Visit the Payouts page to request a withdrawal.
          </p>
        </div>
      )}
    </div>
  );
}
