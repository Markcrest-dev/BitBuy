'use client';

import { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

interface Payout {
  id: string;
  amount: number;
  status: string;
  method: string | null;
  reference: string | null;
  createdAt: string;
  processedAt: string | null;
}

interface PayoutStats {
  availableBalance: number;
  pendingPayouts: number;
  totalPaidOut: number;
  payouts: Payout[];
}

const statusConfig = {
  PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
  PROCESSING: { color: 'bg-blue-100 text-blue-800', icon: BanknotesIcon, label: 'Processing' },
  COMPLETED: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Completed' },
  FAILED: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Failed' },
};

export default function VendorPayoutsPage() {
  const [stats, setStats] = useState<PayoutStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      const response = await fetch('/api/vendor/payouts');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load payouts');
      }
    } catch (err) {
      setError('Failed to load payouts');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);
    setError('');

    const amount = parseFloat(requestAmount);

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      setIsRequesting(false);
      return;
    }

    if (stats && amount > stats.availableBalance) {
      setError('Insufficient balance');
      setIsRequesting(false);
      return;
    }

    try {
      const response = await fetch('/api/vendor/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        setRequestAmount('');
        fetchPayouts(); // Refresh data
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to request payout');
      }
    } catch (err) {
      setError('Failed to request payout');
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">Failed to load payout information</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payouts</h1>
        <p className="text-gray-600 mt-1">Manage your earnings and withdrawal requests</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Available Balance</h3>
          <p className="text-3xl font-bold text-green-600">
            ${stats.availableBalance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Ready for withdrawal</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Payouts</h3>
          <p className="text-3xl font-bold text-yellow-600">
            ${stats.pendingPayouts.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Being processed</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Paid Out</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${stats.totalPaidOut.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">All-time earnings</p>
        </div>
      </div>

      {/* Request Payout Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Request Payout</h3>
        <form onSubmit={requestPayout} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="amount"
                step="0.01"
                min="0.01"
                max={stats.availableBalance}
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                className="pl-7 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Maximum: ${stats.availableBalance.toFixed(2)}
            </p>
          </div>

          <div className="mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Payout Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Payouts are processed within 3-5 business days</li>
                <li>• Minimum payout amount: $10.00</li>
                <li>• Funds will be transferred to your registered bank account</li>
                <li>• You'll receive an email confirmation once processed</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            disabled={isRequesting || stats.availableBalance < 10}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRequesting ? 'Processing...' : 'Request Payout'}
          </button>

          {stats.availableBalance < 10 && (
            <p className="text-sm text-red-600 mt-2">
              Minimum payout amount is $10.00
            </p>
          )}
        </form>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Payout History</h3>
        {stats.payouts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No payout history yet. Request your first payout above!
          </p>
        ) : (
          <div className="space-y-3">
            {stats.payouts.map((payout) => {
              const config = statusConfig[payout.status as keyof typeof statusConfig];
              const StatusIcon = config.icon;

              return (
                <div
                  key={payout.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        ${payout.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Requested on {new Date(payout.createdAt).toLocaleDateString()}
                      </p>
                      {payout.processedAt && (
                        <p className="text-sm text-gray-500">
                          Processed on {new Date(payout.processedAt).toLocaleDateString()}
                        </p>
                      )}
                      {payout.reference && (
                        <p className="text-xs text-gray-500">
                          Ref: {payout.reference}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Commission Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">How Payouts Work</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Commission:</strong> The platform takes a 15% commission on each sale. Your
            available balance reflects your 85% share of all completed orders.
          </p>
          <p>
            <strong>Processing Time:</strong> Payout requests are typically processed within 3-5
            business days. You'll receive an email confirmation once the transfer is initiated.
          </p>
          <p>
            <strong>Payment Method:</strong> Payouts are sent to your registered bank account via
            direct deposit.
          </p>
        </div>
      </div>
    </div>
  );
}
