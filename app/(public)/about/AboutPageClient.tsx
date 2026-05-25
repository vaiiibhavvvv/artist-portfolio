'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import Reveal from '@/components/ui/Reveal'

const timeline = [
  { year: 'Beginning', title: 'A First Brushstroke', desc: 'A small home studio in Delhi — built around the simple belief that color is a language of its own.' },
  { year: 'Early Years', title: 'Finding the Voice', desc: 'Years of quiet practice in oils, watercolors, and mixed media, learning what each medium asks for and what it gives back.' },
  { year: 'Commissions', title: 'Painting for People', desc: 'First commissioned works for homes across Delhi — every piece a conversation, not just a transaction.' },
  { year: 'The Studio', title: 'Colorpalette Studio Opens', desc: 'A dedicated space in Saket where we now create original artwork and take on bespoke commissions for collectors.' },
  { year: 'Today', title: 'Coloring the Unsayable', desc: 'Working closely with each client, building pieces meant to live in real rooms and quiet moments — not behind glass.' },
]

const skills = [
  { name: 'Oil Painting', level: 95 },
  { name: 'Watercolor', level: 90 },
  { name: 'Acrylic', level: 85 },
  { name: 'Mixed Media', level: 82 },
  { name: 'Portraiture', level: 78 },
  { name: 'Custom Commissions', level: 96 },
]

const achievements = [
  { icon: '🎨', title: 'Featured Studio', desc: 'Profiled by local arts press for our commission practice' },
  { icon: '🏡', title: 'Homes in 10+ Cities', desc: 'Original artwork placed across India and abroad' },
  { icon: '🤝', title: 'Trusted by Collectors', desc: 'Repeat commissions and word-of-mouth from people we love working with' },
  { icon: '🌿', title: 'Slow-Made', desc: 'Every piece hand-painted in our Saket studio — no prints, no shortcuts' },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-[var(--text-strong)] font-medium text-sm">{name}</span>
        <span className="text-[#FF8C42] text-sm font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #4E342E, #FF8C42)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export default function AboutPageClient() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#2C1A16]">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FF8C42 0%, transparent 60%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#FF8C42] text-xs tracking-widest uppercase mb-4"
          >
            The Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
          >
            About <span className="font-elegant italic font-normal text-[#FFB07A]">Colorpalette Studio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-elegant text-white/65 text-xl md:text-2xl italic max-w-2xl mx-auto"
          >
            Coloring the spaces words can&apos;t reach.
          </motion.p>
        </div>
      </section>

      {/* Story + Portrait */}
      <section className="py-24 px-6 md:px-12 bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -top-5 -right-5 w-full h-full border-2 border-[#FF8C42]/20 rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
                  alt="Inside Colorpalette Studio"
                  width={600}
                  height={750}
                  className="object-cover w-full"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Our Story</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold text-[var(--text-strong)] mb-6 leading-snug">
                Color is how we
                <br /><span className="font-elegant italic font-normal text-[#FF8C42]">say what matters</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[var(--text-base)] leading-relaxed mb-4">
                Colorpalette Studio is a small art practice in Saket, New Delhi. We started the way most
                studios do — with a single room, a stack of canvases, and the stubborn belief that
                hand-painted work still belongs in people&apos;s homes.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                We work in oils, watercolors, and mixed media. Some of what we make is original;
                a lot of it is commissioned — a piece for a new home, a portrait for a milestone,
                an artwork built around a memory someone wants to keep close.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Every painting that leaves this studio is hand-made here. No prints, no shortcuts,
                no rushing a piece that isn&apos;t ready. If you have something you&apos;d like us to make
                with you, we&apos;d love to hear about it.
              </p>
            </Reveal>

            {/* Mission & Vision */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {['Mission', 'Vision'].map((item, i) => (
                <Reveal key={item} delay={0.5 + i * 0.1}>
                  <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border-subtle)]">
                    <h4 className="font-display font-semibold text-[var(--text-strong)] mb-2">{item}</h4>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {item === 'Mission'
                        ? 'To make art that earns its place in the room it lives in — paintings that hold a feeling instead of just decorating a wall.'
                        : 'A practice where every commission begins with listening, and every brushstroke means something we couldn’t have said any other way.'}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-12 bg-[var(--surface-page)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Journey</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[var(--text-strong)]">Our Journey</h2></Reveal>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF8C42] via-[#4E342E] to-[#FF8C42] opacity-30" />

            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div className={`flex items-start gap-6 md:gap-0 mb-10 relative ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FF8C42]/10 text-[#FF8C42] text-xs font-semibold mb-2 tracking-widest">
                      {item.year}
                    </div>
                    <h3 className="font-display font-semibold text-[var(--text-strong)] text-xl mb-1">{item.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-[#FF8C42] bg-[var(--surface-card)] shadow-md" />

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6 md:px-12 bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Craft</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[var(--text-strong)] mb-8">What We Make</h2></Reveal>
              {skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>

            <div>
              <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Recognition</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[var(--text-strong)] mb-8">What We&apos;re Proud Of</h2></Reveal>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] hover:border-[#FF8C42]/30 hover:shadow-md transition-all duration-300">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="font-display font-semibold text-[var(--text-strong)] mb-0.5">{item.title}</h4>
                        <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
