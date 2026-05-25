'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  variant?: 'navbar' | 'navbar-scrolled' | 'plain'
}

export default function ThemeToggle({ variant = 'plain' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const baseClasses =
    'relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300'
  const variantClasses =
    variant === 'navbar'
      ? 'text-white/80 hover:text-[#FF8C42] border border-white/20 hover:border-[#FF8C42]/50'
      : variant === 'navbar-scrolled'
        ? 'text-[#4E342E] dark:text-white/80 hover:text-[#FF8C42] border border-[#4E342E]/15 dark:border-white/15 hover:border-[#FF8C42]/50'
        : 'text-[#4E342E] dark:text-white/80 hover:text-[#FF8C42] border border-[#4E342E]/15 dark:border-white/15'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      className={`${baseClasses} ${variantClasses}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? 'moon' : 'sun') : 'placeholder'}
          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {mounted ? (isDark ? <Moon size={16} /> : <Sun size={16} />) : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
