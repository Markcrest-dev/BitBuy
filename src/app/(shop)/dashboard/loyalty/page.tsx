'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GiftIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface LoyaltyAccount {
  id: string;
  points: number;
  totalEarned: number;
  totalRedeemed: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  createdAt: string;
  updatedAt: string;
  transactions: LoyaltyTransaction[];
}

interface LoyaltyTransaction {
  id: string;
  type: 'EARNED' | 'REDEEMED' | 'EXPIRED' | 'BONUS';
  points: number;
  description: string;
  createdAt: string;
}

const tierInfo = {
  BRONZE: {
    name: 'Bronze',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '🥉',
    pointsRequired: 0,
    benefits: ['1 point per $1 spent', 'Birthday bonus', 'Early sale access'],
  },
  SILVER: {
    name: 'Silver',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    icon: '🥈',
    pointsRequired: 500,
    benefits: ['1.5 points per $1 spent', 'Free shipping', 'Priority support'],
  },
  GOLD: {
    name: 'Gold',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    icon: '🥇',
    pointsRequired: 1500,
    benefits: ['2 points per $1 spent', 'Exclusive discounts', 'VIP events'],
  },
  PLATINUM: {
    name: 'Platinum',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    icon: '💎',
    pointsRequired: 5000,
    benefits: ['3 points per $1 spent', 'Personal shopper', 'All perks'],
  },
};

export default function LoyaltyPage() {
  const { data: session, status } = useSession();
  const [account, setAccount] = useState<LoyaltyAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchLoyaltyAccount();
    }
  }, [status]);

  const fetchLoyaltyAccount = async () => {
    try {
      const response = await fetch('/api/loyalty');
      if (response.ok) {
        const data = await response.json();
        setAccount(data);
      }
    } catch (error) {
      console.error('Error fetching loyalty account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p>Failed to load loyalty account</p>
      </div>
    );
  }

  const currentTier = tierInfo[account.tier];
  const tiers = Object.entries(tierInfo);
  const currentTierIndex = tiers.findIndex(([key]) => key === account.tier);
  const nextTier = tiers[currentTierIndex + 1];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Loyalty Rewards Program
      </h1>

      {/* Current Status Card */}
      <div className={`rounded-xl ${currentTier.bg} ${currentTier.border} border-2 p-8 mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{currentTier.icon}</div>
            <div>
              <h2 className={`text-3xl font-bold ${currentTier.color}`}>
                {currentTier.name} Member
              </h2>
              <p className="text-gray-600">
                Member since {new Date(account.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-600">
              {account.points}
            </div>
            <div className="text-gray-600">Points Available</div>
          </div>
        </div>

        {nextTier && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress to {nextTier[1].name}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {account.totalEarned} / {nextTier[1].pointsRequired} points
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (account.totalEarned / nextTier[1].pointsRequired) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <SparklesIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Total Earned
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {account.totalEarned}
          </p>
          <p className="text-sm text-gray-600">lifetime points</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <GiftIcon className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Total Redeemed
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {account.totalRedeemed}
          </p>
          <p className="text-sm text-gray-600">points used</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrophyIcon className="h-6 w-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Your Tier
            </h3>
          </div>
          <p className={`text-3xl font-bold ${currentTier.color}`}>
            {currentTier.name}
          </p>
          <p className="text-sm text-gray-600">membership level</p>
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Your Benefits
        </h3>
        <ul className="space-y-2">
          {currentTier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {account.transactions.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No transactions yet. Start shopping to earn points!
            </p>
          ) : (
            account.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`text-lg font-bold ${
                    transaction.type === 'EARNED' || transaction.type === 'BONUS'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.points > 0 ? '+' : ''}
                  {transaction.points}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
