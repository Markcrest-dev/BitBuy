'use client'

import { useUIStore } from '@/store/uiStore'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ToastManager() {
  const { toasts, removeToast } = useUIStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircleIcon
            : toast.type === 'error'
            ? XCircleIcon
            : toast.type === 'warning'
            ? ExclamationTriangleIcon
            : InformationCircleIcon

        const bgColor =
          toast.type === 'success'
            ? 'bg-green-50'
            : toast.type === 'error'
            ? 'bg-red-50'
            : toast.type === 'warning'
            ? 'bg-yellow-50'
            : 'bg-blue-50'

        const textColor =
          toast.type === 'success'
            ? 'text-green-800'
            : toast.type === 'error'
            ? 'text-red-800'
            : toast.type === 'warning'
            ? 'text-yellow-800'
            : 'text-blue-800'

        const iconColor =
          toast.type === 'success'
            ? 'text-green-500'
            : toast.type === 'error'
            ? 'text-red-500'
            : toast.type === 'warning'
            ? 'text-yellow-500'
            : 'text-blue-500'

        return (
          <div
            key={toast.id}
            className={`${bgColor} ${textColor} rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-up`}
          >
            <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-70 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
