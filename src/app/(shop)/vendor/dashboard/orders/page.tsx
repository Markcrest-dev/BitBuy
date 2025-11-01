'use client';

import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClockIcon, TruckIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
}

const statusConfig = {
  PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
  PROCESSING: { color: 'bg-blue-100 text-blue-800', icon: TruckIcon, label: 'Processing' },
  SHIPPED: { color: 'bg-purple-100 text-purple-800', icon: TruckIcon, label: 'Shipped' },
  DELIVERED: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Delivered' },
  CANCELLED: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Cancelled' },
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/vendor/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load orders');
      }
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/vendor/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh orders
        fetchOrders();
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const filteredOrders = filter === 'ALL'
    ? orders
    : orders.filter(order => order.status === filter);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage your customer orders</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex space-x-1">
        {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status}
            {status !== 'ALL' && (
              <span className="ml-2 text-xs">
                ({orders.filter(o => o.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {config.label}
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-sm text-gray-900">{order.user.name || 'No name'}</p>
                  <p className="text-sm text-gray-600">{order.user.email}</p>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-900">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                  <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PROCESSING')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        Mark as Processing
                      </button>
                    )}
                    {order.status === 'PROCESSING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'SHIPPED')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                      >
                        Mark as Shipped
                      </button>
                    )}
                    {order.status === 'SHIPPED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Summary */}
      {orders.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'PENDING').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Processing</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'PROCESSING').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Shipped</p>
              <p className="text-2xl font-bold text-purple-600">
                {orders.filter(o => o.status === 'SHIPPED').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'DELIVERED').length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
