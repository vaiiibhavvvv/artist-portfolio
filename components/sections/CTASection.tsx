'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#2C1A16]" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #FF8C42 0%, transparent 60%),
                            radial-gradient(circle at 70% 50%, #FF8C42 0%, transparent 50%)`
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-4 font-medium">Commission Work</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Let&apos;s Create
            <br />
            <span className="font-elegant italic font-normal text-[#FFB07A]">Something Timeless</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Whether it&apos;s a personal commission, a corporate collection, or a question about an existing piece —
            I&apos;d love to hear from you.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full font-medium text-white text-sm tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #FF8C42, #E65100)',
                  boxShadow: '0 8px 30px rgba(255, 140, 66, 0.5)',
                }}
              >
                Start a Conversation
              </motion.button>
            </Link>
            <Link href="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full border border-white/30 text-white text-sm tracking-wide hover:bg-white/10 transition-colors duration-300"
              >
                Browse Gallery
              </motion.button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
