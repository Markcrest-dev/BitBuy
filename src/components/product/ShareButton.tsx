'use client';

import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  productName: string;
  productUrl: string;
  productImage?: string;
}

export default function ShareButton({ productName, productUrl, productImage }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${productUrl}`
    : productUrl;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on BitBuy!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(productName);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      pinterest: productImage
        ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(productImage)}&description=${encodedTitle}`
        : `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Share product"
      >
        <ShareIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Share</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
            <button
              onClick={() => shareToSocial('facebook')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">📘</span>
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={() => shareToSocial('twitter')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">🐦</span>
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={() => shareToSocial('pinterest')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">📌</span>
              <span>Share on Pinterest</span>
            </button>
            <button
              onClick={() => shareToSocial('linkedin')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">💼</span>
              <span>Share on LinkedIn</span>
            </button>
            <button
              onClick={() => shareToSocial('whatsapp')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">💬</span>
              <span>Share on WhatsApp</span>
            </button>
            <div className="border-t border-gray-200 my-2" />
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">🔗</span>
              <span>Copy Link</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
