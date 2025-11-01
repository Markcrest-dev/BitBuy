'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface AddToWishlistButtonProps {
  productId: string
  isInWishlist?: boolean
  onToggle?: (isInWishlist: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AddToWishlistButton({
  productId,
  isInWishlist: initialIsInWishlist = false,
  onToggle,
  size = 'md',
  className = '',
}: AddToWishlistButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist)
  const [isLoading, setIsLoading] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleToggle = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setIsLoading(true)

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch(`/api/wishlist/${productId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to remove from wishlist')
        }

        setIsInWishlist(false)
        onToggle?.(false)
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to add to wishlist')
        }

        setIsInWishlist(true)
        onToggle?.(true)
      }
    } catch (error: any) {
      console.error('Wishlist toggle error:', error)
      alert(error.message || 'Failed to update wishlist')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isInWishlist
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-transparent" style={{ width: '60%', height: '60%' }} />
      ) : isInWishlist ? (
        <HeartIconSolid className={iconSizeClasses[size]} />
      ) : (
        <HeartIcon className={iconSizeClasses[size]} />
      )}
    </button>
  )
}
