'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

const floatingCards = [
  { label: 'Delhi', sub: 'Studio', delay: 0.8, pos: 'top-1/4 left-6 md:left-16' },
  { label: 'Custom', sub: 'Commissions', delay: 1.0, pos: 'top-1/3 right-6 md:right-16' },
  { label: 'Original', sub: 'Artwork', delay: 1.2, pos: 'bottom-1/3 left-6 md:left-24' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rich painterly background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A16] via-[#4E342E] to-[#1a0d0a]" />

      {/* Abstract paint strokes */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FF8C42] blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#FF8C42] blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-[#6D4C41] blur-[90px]" />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating glass cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          className={`absolute ${card.pos} hidden sm:block z-20`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center shadow-xl"
          >
            <div className="font-display text-xl font-bold text-white">{card.label}</div>
            <div className="text-white/60 text-xs tracking-widest uppercase">{card.sub}</div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-heading tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#FF8C42]/40 bg-[#FF8C42]/10 text-[#FF8C42] text-xs tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] animate-pulse" />
          Colorpalette Studio
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-none mb-4"
        >
          Coloring the
          <br />
          <span
            className="italic"
            style={{
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFB07A 50%, #FF8C42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            unsayable
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-elegant text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed italic"
        >
          A Delhi-based art studio where every shade tells a story —
          original paintings, custom commissions, and color for the spaces words can&apos;t reach.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white text-sm tracking-wide shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #FF8C42, #E65100)',
                boxShadow: '0 8px 30px rgba(255, 140, 66, 0.4)',
              }}
            >
              View Gallery
              <ArrowRight size={16} />
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white text-sm tracking-wide backdrop-blur-sm bg-white/10 transition-colors duration-300"
            >
              Contact Artist
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
