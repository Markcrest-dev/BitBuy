'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserGroupIcon, GiftIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  bonusPointsEarned: number;
  referrals: Array<{
    id: string;
    referredEmail: string;
    status: string;
    bonusAwarded: boolean;
    createdAt: string;
  }>;
}

export default function ReferralsPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referrals');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      console.error('Failed to fetch referral data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = async () => {
    if (!data) return;

    const referralUrl = `${window.location.origin}?ref=${data.referralCode}`;

    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p>Failed to load referral data</p>
      </div>
    );
  }

  const referralUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${data.referralCode}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Referral Program</h1>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <GiftIcon className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Earn Rewards by Referring Friends!</h2>
        </div>
        <p className="text-blue-100 mb-6">
          Share your unique referral link and earn 100 bonus points for each friend who makes their first purchase.
          Your friends get 50 bonus points too!
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-blue-100 mb-2">Your Referral Link:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50"
            />
            <button
              onClick={copyReferralLink}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-5 w-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Total Referrals</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.totalReferrals}</p>
          <p className="text-sm text-gray-600">Friends referred</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <GiftIcon className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Bonus Points</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{data.bonusPointsEarned}</p>
          <p className="text-sm text-gray-600">Points earned from referrals</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <ClipboardDocumentIcon className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Referral Code</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.referralCode}</p>
          <p className="text-sm text-gray-600">Your unique code</p>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Share Your Link</h4>
            <p className="text-sm text-gray-600">
              Copy your unique referral link and share it with friends via email, social media, or messaging apps.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Friend Signs Up</h4>
            <p className="text-sm text-gray-600">
              Your friend creates an account using your referral link and gets 50 bonus points.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Earn Rewards</h4>
            <p className="text-sm text-gray-600">
              When your friend makes their first purchase, you both receive bonus points!
            </p>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Referrals</h3>
        {data.referrals.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No referrals yet. Start sharing your link to earn rewards!
          </p>
        ) : (
          <div className="space-y-3">
            {data.referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{referral.referredEmail}</p>
                  <p className="text-sm text-gray-600">
                    Joined on {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      referral.bonusAwarded
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {referral.bonusAwarded ? 'Bonus Earned' : 'Pending Purchase'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
