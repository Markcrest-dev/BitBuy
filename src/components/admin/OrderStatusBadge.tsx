interface OrderStatusBadgeProps {
  status: string
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800',
    },
    PROCESSING: {
      label: 'Processing',
      className: 'bg-blue-100 text-blue-800',
    },
    SHIPPED: {
      label: 'Shipped',
      className: 'bg-purple-100 text-purple-800',
    },
    DELIVERED: {
      label: 'Delivered',
      className: 'bg-green-100 text-green-800',
    },
    CANCELLED: {
      label: 'Cancelled',
      className: 'bg-red-100 text-red-800',
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: 'bg-gray-100 text-gray-800',
  }

  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  )
}
