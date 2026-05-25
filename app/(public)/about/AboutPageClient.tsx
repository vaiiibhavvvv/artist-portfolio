'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import Reveal from '@/components/ui/Reveal'

const timeline = [
  { year: '2008', title: 'First Brushstroke', desc: 'Began formal training at the New York Academy of Fine Arts, studying under master painters.' },
  { year: '2011', title: 'First Solo Exhibition', desc: 'Debuted at the Chelsea Gallery with "Embers" — sold out within the opening week.' },
  { year: '2014', title: 'International Recognition', desc: 'Invited to exhibit at the Paris Biennale; featured in Art Today magazine.' },
  { year: '2017', title: 'Studio Founding', desc: 'Established the Silver Studio in downtown New York, opening a school for young artists.' },
  { year: '2020', title: 'Digital Expansion', desc: 'Launched online classes during the pandemic, reaching 10,000+ students worldwide.' },
  { year: '2024', title: 'Present', desc: 'Continuing to push creative boundaries with new mixed media explorations and international commissions.' },
]

const skills = [
  { name: 'Oil Painting', level: 97 },
  { name: 'Watercolor', level: 90 },
  { name: 'Acrylic', level: 85 },
  { name: 'Mixed Media', level: 80 },
  { name: 'Digital Art', level: 70 },
  { name: 'Sculpture', level: 65 },
]

const achievements = [
  { icon: '🏆', title: 'Gold Medal', desc: 'International Art Olympiad, Vienna 2019' },
  { icon: '🎨', title: 'Best Contemporary Artist', desc: 'New York Art Awards 2021' },
  { icon: '📚', title: 'Published Author', desc: '"The Language of Paint" — bestselling art guide' },
  { icon: '🌍', title: 'UNESCO Fellow', desc: 'Art education ambassador 2022–present' },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-[#4E342E] font-medium text-sm">{name}</span>
        <span className="text-[#FF8C42] text-sm font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#4E342E]/10 rounded-full overflow-hidden">
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
            The Artist
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
          >
            About <span className="font-elegant italic font-normal text-[#FFB07A]">Ariana</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-elegant text-white/60 text-xl italic max-w-2xl mx-auto"
          >
            Art is not what you see, but what you make others see.
          </motion.p>
        </div>
      </section>

      {/* Story + Portrait */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -top-5 -right-5 w-full h-full border-2 border-[#FF8C42]/20 rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
                  alt="Ariana Silva in her studio"
                  width={600}
                  height={750}
                  className="object-cover w-full"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">My Story</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold text-[#4E342E] mb-6 leading-snug">
                Born with Paint
                <br /><span className="font-elegant italic font-normal text-[#FF8C42]">in My Veins</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6D4C41]/80 leading-relaxed mb-4">
                I grew up watching my grandmother paint in a sun-drenched corner of our home in Lisbon.
                The smell of linseed oil, the quiet concentration in her eyes — that image never left me.
                By age twelve, I had filled three sketchbooks and knew I would spend my life creating.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-[#6D4C41]/70 leading-relaxed mb-4">
                I trained at the New York Academy of Fine Arts and later apprenticed under the legendary
                portraitist Elise Moreau in Paris. Those years forged not just technique, but a philosophy:
                art should disturb the comfortable and comfort the disturbed.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-[#6D4C41]/70 leading-relaxed">
                Today, I work from my Silver Studio in New York, accepting commissions worldwide and teaching
                the next generation of artists that courage is the most important medium of all.
              </p>
            </Reveal>

            {/* Mission & Vision */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {['Mission', 'Vision'].map((item, i) => (
                <Reveal key={item} delay={0.5 + i * 0.1}>
                  <div className="p-5 rounded-2xl bg-[#f8f5f0] border border-[#4E342E]/8">
                    <h4 className="font-display font-semibold text-[#4E342E] mb-2">{item}</h4>
                    <p className="text-[#6D4C41]/70 text-sm leading-relaxed">
                      {item === 'Mission'
                        ? 'To create art that moves people — that stops them mid-step and makes them feel something real.'
                        : 'A world where beauty is not a luxury but a necessity, accessible to all who seek it.'}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-12 bg-[#f8f5f0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Journey</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[#4E342E]">Artistic Timeline</h2></Reveal>
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
                    <h3 className="font-display font-semibold text-[#4E342E] text-xl mb-1">{item.title}</h3>
                    <p className="text-[#6D4C41]/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-[#FF8C42] bg-white shadow-md" />

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Expertise</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[#4E342E] mb-8">Skills & Mastery</h2></Reveal>
              {skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>

            <div>
              <Reveal><p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3">Recognition</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display text-4xl font-bold text-[#4E342E] mb-8">Achievements</h2></Reveal>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#4E342E]/8 bg-[#f8f5f0] hover:border-[#FF8C42]/30 hover:shadow-md transition-all duration-300">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="font-display font-semibold text-[#4E342E] mb-0.5">{item.title}</h4>
                        <p className="text-[#6D4C41]/60 text-sm">{item.desc}</p>
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
