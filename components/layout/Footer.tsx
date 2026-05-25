'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { STUDIO, TEL_URL } from '@/lib/utils'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { icon: Instagram, href: STUDIO.instagram, label: 'Instagram' },
  { icon: Facebook, href: STUDIO.facebook, label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#3E2723]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #FF8C42 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #FF8C42 0%, transparent 40%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#E65100] flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">C</span>
              </div>
              <span className="font-display text-2xl text-white font-semibold">{STUDIO.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {STUDIO.tagline}. A Delhi-based art studio crafting colors that tell stories — one canvas, one commission, one feeling at a time.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#FF8C42] hover:border-[#FF8C42] transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#FF8C42] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="text-[#FF8C42] shrink-0 mt-0.5" />
                <span>{STUDIO.address}</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={16} className="text-[#FF8C42] shrink-0" />
                <a href={TEL_URL} className="hover:text-[#FF8C42] transition-colors">
                  {STUDIO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={16} className="text-[#FF8C42] shrink-0" />
                <a href={`mailto:${STUDIO.email}`} className="hover:text-[#FF8C42] transition-colors break-all">
                  {STUDIO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {STUDIO.name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-elegant italic">Crafted with passion & pixels</p>
        </div>
      </div>
    </footer>
  )
}
