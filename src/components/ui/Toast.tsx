'use client'

import { useEffect, useState } from 'react'
import { XMarkIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const styles = {
    success: {
      container: 'bg-green-50 border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-600',
      text: 'text-green-800',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: XCircleIcon,
      iconColor: 'text-red-600',
      text: 'text-red-800',
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-600',
      text: 'text-blue-800',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg p-4 ${style.container} animate-slide-up`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${style.iconColor} flex-shrink-0`} />
        <p className={`flex-1 ${style.text} text-sm font-medium`}>{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className={`${style.iconColor} hover:opacity-70 transition`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Toast Container for managing multiple toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([])

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}
