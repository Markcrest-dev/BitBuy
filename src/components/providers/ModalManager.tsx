'use client'

import { useUIStore } from '@/store/uiStore'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function ModalManager() {
  const { modals, closeModal } = useUIStore()

  if (modals.length === 0) return null

  return (
    <>
      {modals.map((modal) => {
        const sizeClasses = {
          sm: 'max-w-md',
          md: 'max-w-lg',
          lg: 'max-w-2xl',
          xl: 'max-w-4xl',
        }

        const sizeClass = sizeClasses[modal.size || 'md']

        return (
          <div key={modal.id} className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
              onClick={() => closeModal(modal.id)}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className={`relative bg-white rounded-lg shadow-xl ${sizeClass} w-full animate-modal-in`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                {modal.title && (
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">{modal.title}</h3>
                    <button
                      onClick={() => closeModal(modal.id)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {/* Content */}
                <div className="px-6 py-4">{modal.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
