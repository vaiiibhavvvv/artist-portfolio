import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#2C1A16] px-6">
      <div className="text-center">
        <div
          className="font-display text-[160px] font-bold leading-none mb-4 opacity-10"
          style={{
            background: 'linear-gradient(135deg, #FF8C42, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-3 -mt-8">Page Not Found</h1>
        <p className="font-elegant text-white/50 text-xl italic mb-8">
          This canvas is empty — let&apos;s take you somewhere beautiful.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #FF8C42, #E65100)' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
