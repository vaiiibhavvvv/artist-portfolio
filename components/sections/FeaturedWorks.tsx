'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const featuredWorks = [
  {
    id: '1',
    title: 'Autumn Reverie',
    category: 'Oil Painting',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    height: 'h-72',
  },
  {
    id: '2',
    title: 'Ocean Whispers',
    category: 'Watercolor',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    height: 'h-56',
  },
  {
    id: '3',
    title: 'Golden Hour',
    category: 'Acrylic',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326b24?w=600&q=80',
    height: 'h-80',
  },
  {
    id: '4',
    title: 'Abstract Souls',
    category: 'Mixed Media',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    height: 'h-64',
  },
  {
    id: '5',
    title: 'Silent Forest',
    category: 'Oil Painting',
    imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80',
    height: 'h-72',
  },
  {
    id: '6',
    title: 'Celestial Dreams',
    category: 'Digital Art',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    height: 'h-56',
  },
]

export default function FeaturedWorks() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">Portfolio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4E342E] mb-4">
              Featured Works
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-elegant text-[#6D4C41]/70 text-lg italic max-w-xl mx-auto">
              A curated selection of pieces that define the artistic journey
            </p>
          </Reveal>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {featuredWorks.map((work, i) => (
            <Reveal key={work.id} delay={i * 0.07} className="break-inside-avoid mb-6">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 bg-white cursor-pointer"
              >
                <div className={`relative ${work.height} overflow-hidden`}>
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-1">{work.category}</p>
                    <h3 className="font-display text-white text-xl font-semibold">{work.title}</h3>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-14">
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border-2 border-[#4E342E] text-[#4E342E] font-medium tracking-wide hover:bg-[#4E342E] hover:text-white transition-all duration-300"
            >
              View Full Gallery
            </motion.button>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
