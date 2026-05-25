import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[var(--surface-muted)] animate-shimmer',
        className,
      )}
    />
  )
}

export function ArtworkSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[var(--surface-card)] shadow-sm border border-[var(--border-subtle)]">
      <Skeleton className="w-full h-64" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}
