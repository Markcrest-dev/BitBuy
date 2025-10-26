import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export interface Modal {
  id: string
  title?: string
  content: React.ReactNode
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

interface UIStore {
  // Toast management
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // Modal management
  modals: Modal[]
  openModal: (modal: Omit<Modal, 'id'>) => void
  closeModal: (id: string) => void
  closeAllModals: () => void

  // Loading states
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void

  // Sidebar state (for mobile)
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Toast state
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))

    // Auto-remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, toast.duration || 3000)
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  // Modal state
  modals: [],

  openModal: (modal) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newModal = { ...modal, id }

    set((state) => ({
      modals: [...state.modals, newModal],
    }))
  },

  closeModal: (id) => {
    const modal = get().modals.find((m) => m.id === id)
    if (modal?.onClose) {
      modal.onClose()
    }

    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    }))
  },

  closeAllModals: () => {
    get().modals.forEach((modal) => {
      if (modal.onClose) {
        modal.onClose()
      }
    })

    set({ modals: [] })
  },

  // Loading state
  globalLoading: false,

  setGlobalLoading: (loading) => {
    set({ globalLoading: loading })
  },

  // Sidebar state
  isSidebarOpen: false,

  toggleSidebar: () => {
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    }))
  },

  closeSidebar: () => {
    set({ isSidebarOpen: false })
  },
}))
