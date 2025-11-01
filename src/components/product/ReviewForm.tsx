'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'

interface ReviewFormProps {
  productId: string
  onReviewSubmitted?: () => void
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      router.push('/login')
      return
    }

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (comment.trim().length < 10) {
      setError('Please write a review with at least 10 characters')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating,
          comment: comment.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      // Reset form
      setRating(0)
      setComment('')
      setError('')

      // Notify parent component
      onReviewSubmitted?.()
    } catch (error: any) {
      console.error('Submit review error:', error)
      setError(error.message || 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border-2 border-amber-100 text-center">
        <p className="text-gray-700 mb-4">Please sign in to write a review</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-md font-medium"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border-2 border-amber-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>

      {/* Star Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating *
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              {(hoveredRating || rating) >= star ? (
                <StarIcon className="w-8 h-8 text-amber-500" />
              ) : (
                <StarOutlineIcon className="w-8 h-8 text-gray-300" />
              )}
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          id="comment"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          {comment.length}/500 characters (minimum 10)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-yellow-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
