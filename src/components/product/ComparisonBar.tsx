'use client';

import { useComparisonStore } from '@/store/comparisonStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function ComparisonBar() {
  const { products, removeProduct, clearComparison } = useComparisonStore();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-2xl z-40 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Compare Products
              </h3>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {products.length}/4
              </span>
            </div>

            <div className="flex items-center space-x-3 flex-1 overflow-x-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative flex-shrink-0 group"
                >
                  <div className="w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from comparison"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: 4 - products.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-gray-400 text-xs">+</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-4">
            <Link
              href="/products/compare"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Compare Now
            </Link>
            <button
              onClick={clearComparison}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
