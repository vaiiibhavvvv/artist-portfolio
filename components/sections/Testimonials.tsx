'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const testimonials = [
  {
    id: 1,
    name: 'Isabella Fontaine',
    role: 'Art Collector, Paris',
    text: 'Ariana\'s work transformed my living room into a gallery. The depth and emotion in her oil paintings is truly extraordinary — each piece has its own soul.',
    rating: 5,
    avatar: 'IF',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    role: 'Interior Designer, New York',
    text: 'I\'ve collaborated with many artists, but Ariana\'s ability to understand a client\'s vision and translate it into breathtaking art is unparalleled.',
    rating: 5,
    avatar: 'MW',
  },
  {
    id: 3,
    name: 'Sofia Nakamura',
    role: 'Gallery Director, Tokyo',
    text: 'We featured Ariana\'s collection last spring and the response was overwhelming. Her work speaks across cultural boundaries with a universal language of beauty.',
    rating: 5,
    avatar: 'SN',
  },
  {
    id: 4,
    name: 'David Laurent',
    role: 'Private Collector, London',
    text: 'Commissioned a portrait for my family\'s estate. Ariana delivered a masterpiece that will be treasured for generations. Truly exceptional talent.',
    rating: 5,
    avatar: 'DL',
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
    <section className="py-24 px-6 md:px-12 bg-[#f8f5f0] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF8C42]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#4E342E]/5 blur-3xl" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Reveal>
            <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">Testimonials</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4E342E]">
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
              className="bg-white rounded-3xl p-10 md:p-14 shadow-md border border-[#4E342E]/5 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-[#FF8C42] fill-[#FF8C42]" />
                ))}
              </div>

              {/* Quote mark */}
              <div className="font-display text-8xl text-[#FF8C42]/20 leading-none -mt-4 mb-2 select-none">&ldquo;</div>

              <p className="font-elegant text-[#4E342E] text-xl md:text-2xl leading-relaxed italic mb-8 -mt-6">
                {testimonials[current].text}
              </p>

              {/* Avatar */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center text-white font-display font-bold">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-[#4E342E]">{testimonials[current].name}</p>
                  <p className="text-[#6D4C41]/60 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-[#4E342E]/20 flex items-center justify-center text-[#4E342E] hover:border-[#FF8C42] hover:text-[#FF8C42] transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#FF8C42]' : 'w-3 bg-[#4E342E]/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-[#4E342E]/20 flex items-center justify-center text-[#4E342E] hover:border-[#FF8C42] hover:text-[#FF8C42] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
