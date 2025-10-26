import { useSession, signIn, signOut } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useEffect } from 'react'

// Sync NextAuth session with Zustand store
export function useAuth() {
  const { data: session, status } = useSession()
  const { user, setUser, setLoading, logout } = useAuthStore()
  const addToast = useUIStore((state) => state.addToast)

  // Sync session to Zustand store
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id as string,
        name: session.user.name || '',
        email: session.user.email || '',
        phone: (session.user as any).phone as string | undefined,
        role: ((session.user as any).role as 'USER' | 'ADMIN') || 'USER',
        image: session.user.image || undefined,
      })
    } else if (status === 'unauthenticated') {
      setUser(null)
    }
  }, [session, status, setUser, setLoading])

  return {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    isAdmin: user?.role === 'ADMIN',
    session,
    status,
  }
}

// Login mutation
export function useLogin() {
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: () => {
      addToast({
        message: 'Login successful!',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Login failed',
        type: 'error',
      })
    },
  })
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient()
  const { logout: logoutStore } = useAuthStore()
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false })
    },
    onSuccess: () => {
      logoutStore()
      queryClient.clear() // Clear all cached data
      addToast({
        message: 'Logged out successfully',
        type: 'success',
      })
    },
  })
}

// Register mutation
export function useRegister() {
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (userData: {
      name: string
      email: string
      password: string
      phone?: string
    }) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Registration failed')
      }

      return response.json()
    },
    onSuccess: () => {
      addToast({
        message: 'Registration successful! Please login.',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Registration failed',
        type: 'error',
      })
    },
  })
}

// Update profile mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (userData: {
      name?: string
      email?: string
      phone?: string
    }) => {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update profile')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      addToast({
        message: 'Profile updated successfully',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Failed to update profile',
        type: 'error',
      })
    },
  })
}

// Change password mutation
export function useChangePassword() {
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (passwordData: {
      currentPassword: string
      newPassword: string
    }) => {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to change password')
      }

      return response.json()
    },
    onSuccess: () => {
      addToast({
        message: 'Password changed successfully',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Failed to change password',
        type: 'error',
      })
    },
  })
}
