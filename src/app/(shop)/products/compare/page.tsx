'use client';

import { useComparisonStore } from '@/store/comparisonStore';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ComparisonPage() {
  const router = useRouter();
  const { products, removeProduct, clearComparison } = useComparisonStore();

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            No Products to Compare
          </h2>
          <p className="mt-2 text-gray-600">
            Start adding products to compare their features and specifications.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const allSpecs = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specifications || {})))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Comparison
          </h1>
          <p className="text-gray-600 mt-1">
            Comparing {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={clearComparison}
            className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-48 p-4 bg-gray-50 text-left font-semibold text-gray-900 sticky left-0 z-10">
                Attribute
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className="min-w-64 p-4 bg-white border-l border-gray-200"
                >
                  <div className="relative">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-0 right-0 text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Remove product"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <div className="mt-8">
                      <div className="relative h-48 mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.comparePrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.comparePrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-4">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating}</span>
                          {product.reviews && (
                            <span>({product.reviews} reviews)</span>
                          )}
                        </div>
                      )}
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        View Product
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Availability */}
            <tr className="border-t border-gray-200">
              <td className="p-4 bg-gray-50 font-medium text-gray-900 sticky left-0">
                Availability
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="p-4 text-center border-l border-gray-200"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-t border-gray-200 bg-white">
              <td className="p-4 bg-gray-50 font-medium text-gray-900 sticky left-0">
                Category
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="p-4 text-center border-l border-gray-200"
                >
                  {product.category}
                </td>
              ))}
            </tr>

            {/* Specifications */}
            {allSpecs.length > 0 && (
              <>
                <tr className="border-t-2 border-gray-300">
                  <td
                    colSpan={products.length + 1}
                    className="p-4 bg-gray-100 font-bold text-gray-900 sticky left-0"
                  >
                    Specifications
                  </td>
                </tr>
                {allSpecs.map((spec, index) => (
                  <tr
                    key={spec}
                    className={`border-t border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-4 bg-gray-50 font-medium text-gray-900 sticky left-0">
                      {spec}
                    </td>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 text-center border-l border-gray-200"
                      >
                        {product.specifications?.[spec] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {products.length < 4 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            You can add up to {4 - products.length} more{' '}
            {4 - products.length === 1 ? 'product' : 'products'} to compare.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Add More Products
          </Link>
        </div>
      )}
    </div>
  );
}
