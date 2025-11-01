'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  active: boolean;
  imageUrl: string | null;
  category: {
    name: string;
  };
  createdAt: string;
}

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/vendor/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load products');
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/vendor/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setProducts(products.map(p =>
          p.id === productId ? { ...p, active: !currentStatus } : p
        ));
      }
    } catch (err) {
      console.error('Error toggling product status:', err);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/vendor/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/vendor/dashboard/products/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't added any products yet.</p>
            <Link
              href="/vendor/dashboard/products/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Product
            </Link>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock > 0 ? (
                        <span className="text-green-600">{product.stock}</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleProductStatus(product.id, product.active)}
                        className="text-gray-600 hover:text-gray-900"
                        title={product.active ? 'Deactivate' : 'Activate'}
                      >
                        {product.active ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                      <Link
                        href={`/vendor/dashboard/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Products</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.active).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
