import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]',
        className
      )}
      style={{
        animation: 'shimmer 1.5s infinite',
        backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
      }}
    />
  )
}

export function ArtworkSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-amber-50">
      <Skeleton className="w-full h-64" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}
