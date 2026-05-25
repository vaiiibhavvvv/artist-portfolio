'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { TEL_URL } from '@/lib/utils'

export default function CallButton() {
  return (
    <motion.a
      href={TEL_URL}
      aria-label="Call studio"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #FF8C42, #E65100)',
        boxShadow: '0 4px 20px rgba(255, 140, 66, 0.45)',
      }}
    >
      <div className="absolute inset-0 rounded-full bg-[#FF8C42] animate-ping opacity-25" />
      <div className="absolute inset-0 rounded-full border-2 border-[#FFB07A] opacity-40" />
      <Phone size={24} className="text-white relative z-10" fill="white" />
    </motion.a>
  )
}
