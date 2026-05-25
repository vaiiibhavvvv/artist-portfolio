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
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#f8f5f0]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl">!</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-[#4E342E] mb-3">Something went wrong</h2>
        <p className="text-[#6D4C41]/70 mb-8">
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
            className="px-6 py-3 rounded-full border-2 border-[#4E342E] text-[#4E342E] text-sm font-medium hover:bg-[#4E342E] hover:text-white transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
