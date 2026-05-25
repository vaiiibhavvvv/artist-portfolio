'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--surface-page)]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl">!</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-[var(--text-strong)] mb-3">Something went wrong</h2>
        <p className="text-[var(--text-muted)] mb-8">
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4E342E] to-[#FF8C42] text-white text-sm font-medium hover:scale-105 transition-transform"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border-2 border-[var(--text-strong)] text-[var(--text-strong)] text-sm font-medium hover:bg-[var(--text-strong)] hover:text-[var(--surface-card)] transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
