import Reveal from './Reveal'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-3 font-medium">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={`font-display text-4xl md:text-5xl font-bold leading-tight mb-4 ${
            light ? 'text-white' : 'text-[#4E342E]'
          }`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={`font-elegant text-lg italic max-w-2xl ${centered ? 'mx-auto' : ''} ${
              light ? 'text-white/60' : 'text-[#6D4C41]/70'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
