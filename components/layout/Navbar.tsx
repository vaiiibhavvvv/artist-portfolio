'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { STUDIO } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/85 dark:bg-[#2d1810]/85 shadow-lg border-b border-amber-100 dark:border-white/5'
          : 'backdrop-blur-sm bg-black/10 dark:bg-black/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center shadow-md group-hover:shadow-orange-300 transition-shadow duration-300">
            <span className="text-white font-display font-bold text-base">C</span>
          </div>
          <span
            className={`font-display font-semibold text-lg tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-[#4E342E] dark:text-white' : 'text-white'
            }`}
          >
            {STUDIO.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-widest uppercase transition-colors duration-300 group ${
                  scrolled
                    ? isActive
                      ? 'text-[#FF8C42]'
                      : 'text-[#4E342E] dark:text-white/85 hover:text-[#FF8C42] dark:hover:text-[#FF8C42]'
                    : isActive
                      ? 'text-[#FF8C42]'
                      : 'text-white hover:text-[#FF8C42]'
                }`}
                style={!scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.5)' } : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#FF8C42] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}

          <ThemeToggle variant={scrolled ? 'navbar-scrolled' : 'navbar'} />
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle variant={scrolled ? 'navbar-scrolled' : 'navbar'} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-[#4E342E] dark:text-white' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-[#2d1810]/95 border-t border-amber-100 dark:border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium tracking-widest uppercase py-2 border-b border-amber-50 dark:border-white/5 ${
                      pathname === link.href ? 'text-[#FF8C42]' : 'text-[#4E342E] dark:text-white/85'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
