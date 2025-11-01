'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface OrderActionsProps {
  orderId: string
  currentStatus: string
}

export default function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ]

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update order status')
      }

      router.refresh()
    } catch (error: any) {
      console.error('Update order status error:', error)
      alert(error.message || 'Failed to update order status')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="relative inline-block">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {isUpdating && option.value === currentStatus ? 'Updating...' : option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}
