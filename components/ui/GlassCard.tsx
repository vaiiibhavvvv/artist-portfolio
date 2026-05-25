import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'cream'
  hover?: boolean
}

export default function GlassCard({
  children,
  className,
  variant = 'light',
  hover = false,
}: GlassCardProps) {
  const variants = {
    light: 'bg-white/12 border-white/20',
    dark: 'bg-[#4E342E]/15 border-[#FF8C42]/15',
    cream: 'bg-[#f8f5f0]/85 border-[#4E342E]/10',
  }

  return (
    <div
      className={cn(
        'backdrop-blur-xl border rounded-2xl',
        variants[variant],
        hover && 'transition-all duration-300 hover:shadow-lg hover:scale-[1.01]',
        className
      )}
    >
      {children}
    </div>
  )
}
