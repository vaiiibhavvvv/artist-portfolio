'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Artworks Created' },
  { value: 120, suffix: '+', label: 'Happy Clients' },
  { value: 30, suffix: '+', label: 'Exhibitions' },
]

export default function ArtistIntro() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <Reveal direction="left">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#FF8C42]/30 rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80"
                  alt="Ariana Silva — Fine Artist"
                  fill
                  className="object-cover"
                />
                {/* Glass card overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-4">
                  <p className="font-display text-white text-lg font-semibold">Ariana Silva</p>
                  <p className="text-white/70 text-sm">Award-Winning Fine Artist</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <Reveal>
              <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">About the Artist</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4E342E] leading-tight mb-6">
                Painting the World
                <br />
                <span className="font-elegant italic font-normal text-[#FF8C42]">as I Feel It</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6D4C41]/80 leading-relaxed mb-4">
                With over 15 years of dedicated practice, I&apos;ve developed a distinctive style that bridges
                classical technique with contemporary emotion. Every brushstroke is an act of discovery.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[#6D4C41]/70 leading-relaxed mb-8">
                My work has been exhibited across galleries in New York, Paris, and Tokyo — each piece
                a silent conversation between artist and viewer, inviting you to feel what words cannot express.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <Link href="/about">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#4E342E] to-[#FF8C42] text-white font-medium text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-12">
                  My Full Story
                </button>
              </Link>
            </Reveal>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.5 + i * 0.1}>
                  <div className="text-center p-4 rounded-2xl bg-[#f8f5f0] border border-[#4E342E]/10">
                    <div className="font-display text-3xl font-bold text-[#4E342E] mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[#6D4C41]/60 text-xs tracking-widest uppercase">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
