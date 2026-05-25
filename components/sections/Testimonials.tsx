'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

// NOTE: Template testimonials — replace with real client quotes once the studio collects them.
const testimonials = [
  {
    id: 1,
    name: 'Anjali Mehta',
    role: 'Collector, Mumbai',
    text: 'The piece they made for our living room feels like it has always belonged there. The way Colorpalette Studio listens before they paint is what makes the difference.',
    rating: 5,
    avatar: 'AM',
  },
  {
    id: 2,
    name: 'Rohan Khanna',
    role: 'Interior Designer, Delhi',
    text: 'I have worked with many studios, but the level of care and craft here is rare. Every commission lands exactly where my clients hoped it would.',
    rating: 5,
    avatar: 'RK',
  },
  {
    id: 3,
    name: 'Priya Iyer',
    role: 'Curator, Bengaluru',
    text: 'There is an honesty to their work that comes from a real love of the medium. Colorpalette Studio paintings feel hand-made in the best possible sense.',
    rating: 5,
    avatar: 'PI',
  },
  {
    id: 4,
    name: 'Sameer Bhatia',
    role: 'Private Collector, Saket',
    text: 'They painted a piece for my parents on their anniversary. Watching them open it was a moment I will keep with me. Thank you for taking it so seriously.',
    rating: 5,
    avatar: 'SB',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--surface-page)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF8C42]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#4E342E]/5 blur-3xl" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Reveal>
            <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">Testimonials</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-strong)]">
              What Collectors Say
            </h2>
          </Reveal>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--surface-card)] rounded-3xl p-10 md:p-14 shadow-md border border-[var(--border-subtle)] text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-[#FF8C42] fill-[#FF8C42]" />
                ))}
              </div>

              {/* Quote mark */}
              <div className="font-display text-8xl text-[#FF8C42]/20 leading-none -mt-4 mb-2 select-none">&ldquo;</div>

              <p className="font-elegant text-[var(--text-strong)] text-xl md:text-2xl leading-relaxed italic mb-8 -mt-6">
                {testimonials[current].text}
              </p>

              {/* Avatar */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center text-white font-display font-bold">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-[var(--text-strong)]">{testimonials[current].name}</p>
                  <p className="text-[var(--text-muted)] text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-strong)] hover:border-[#FF8C42] hover:text-[#FF8C42] transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#FF8C42]' : 'w-3 bg-[var(--border-subtle)]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-strong)] hover:border-[#FF8C42] hover:text-[#FF8C42] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
