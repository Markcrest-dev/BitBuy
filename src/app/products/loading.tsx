import { ProductListSkeleton } from '@/components/ui/ProductSkeleton'

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-4 mb-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>

      {/* Products grid skeleton */}
      <ProductListSkeleton count={12} />
    </div>
  )
}
