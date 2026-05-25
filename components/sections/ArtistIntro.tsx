'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 10, suffix: '+', label: 'Years of Craft' },
  { value: 150, suffix: '+', label: 'Original Works' },
  { value: 80, suffix: '+', label: 'Happy Collectors' },
  { value: 20, suffix: '+', label: 'Showcases' },
]

export default function ArtistIntro() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--surface-card)]">
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
                  alt="Colorpalette Studio — original artwork"
                  fill
                  className="object-cover"
                />
                {/* Glass card overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-4">
                  <p className="font-display text-white text-lg font-semibold">Colorpalette Studio</p>
                  <p className="text-white/70 text-sm">Saket, New Delhi</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <Reveal>
              <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">About the Studio</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-strong)] leading-tight mb-6">
                Color is how we
                <br />
                <span className="font-elegant italic font-normal text-[#FF8C42]">say it best</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[var(--text-base)] leading-relaxed mb-4">
                Colorpalette Studio is a small, deeply hands-on art practice in Saket, New Delhi.
                We work in oils, watercolors, and mixed media — building pieces that try to do
                what conversation often can&apos;t: hold a feeling still long enough to be seen.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                Whether it&apos;s a commission for your home, a gift that carries weight,
                or an original work that found you at the right moment — we&apos;d love to make it with you.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <Link href="/about">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#4E342E] to-[#FF8C42] text-white font-medium text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-12">
                  Read Our Story
                </button>
              </Link>
            </Reveal>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.5 + i * 0.1}>
                  <div className="text-center p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-subtle)]">
                    <div className="font-display text-3xl font-bold text-[var(--text-strong)] mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[var(--text-muted)] text-xs tracking-widest uppercase">{stat.label}</div>
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
