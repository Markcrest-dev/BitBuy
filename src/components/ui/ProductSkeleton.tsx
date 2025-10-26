export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>

        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
      </div>
    </div>
  )
}

export function ProductListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
