'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '1234567890'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello, I visited your portfolio website and I would like to know more about your artwork.'
)

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      }}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
      <div className="absolute inset-0 rounded-full border-2 border-green-300 opacity-40" />
      <MessageCircle size={26} className="text-white relative z-10" fill="white" />
    </motion.a>
  )
}
