'use client'

import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import ReviewForm from './ReviewForm'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface ReviewSectionProps {
  productId: string
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/[productId]/route?productId=${productId}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
        setAverageRating(data.averageRating || 0)
        setTotalReviews(data.totalReviews || 0)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const handleReviewSubmitted = () => {
    fetchReviews()
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= Math.round(rating) ? (
            <StarIcon key={star} className={`${sizeClasses[size]} text-amber-500`} />
          ) : (
            <StarOutlineIcon key={star} className={`${sizeClasses[size]} text-gray-300`} />
          )
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border-2 border-amber-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {totalReviews > 0 ? (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="mb-2">{renderStars(averageRating, 'lg')}</div>
              <p className="text-gray-600">
                Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

                return (
                  <div key={star} className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-700 w-12">
                      {star} star
                    </span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Review Form */}
      <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">All Reviews</h3>

          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border-2 border-amber-100"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  {review.user.image ? (
                    <img
                      src={review.user.image}
                      alt={review.user.name || 'User'}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {/* User Info & Rating */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.user.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Comment */}
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
