'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react'
import type { ContactMessage } from '@/types'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.json())
      .then(data => { setMessages(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
        {/* Message list */}
        <div className="lg:col-span-1 rounded-2xl border border-white/8 overflow-hidden flex flex-col" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="p-4 border-b border-white/8">
            <h3 className="text-white font-display font-semibold">Inbox</h3>
            <p className="text-white/30 text-xs">{messages.length} messages</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/25 text-center p-6">
                <MessageSquare size={32} className="mb-3" />
                <p className="text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full text-left p-4 border-b border-white/5 transition-all ${
                    selected?.id === msg.id ? 'bg-[#FF8C42]/10 border-l-2 border-l-[#FF8C42]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-white/60'}`}>
                      {msg.name}
                    </p>
                    {!msg.read && <div className="w-2 h-2 rounded-full bg-[#FF8C42] shrink-0 mt-1" />}
                  </div>
                  <p className="text-white/30 text-xs truncate">{msg.message}</p>
                  <p className="text-white/20 text-xs mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 h-full"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center text-white font-display font-bold text-xl shrink-0">
                  {selected.name[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{selected.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-white/40 text-sm">
                      <Mail size={13} />
                      <a href={`mailto:${selected.email}`} className="hover:text-[#FF8C42] transition-colors">{selected.email}</a>
                    </span>
                    {selected.phone && (
                      <span className="flex items-center gap-1.5 text-white/40 text-sm">
                        <Phone size={13} />
                        <a href={`tel:${selected.phone}`} className="hover:text-[#FF8C42] transition-colors">{selected.phone}</a>
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-white/30 text-sm">
                      <Calendar size={13} />
                      {new Date(selected.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 border border-white/8 bg-white/3">
                <p className="text-white/70 leading-relaxed">{selected.message}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message to Ariana Silva Art`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FF8C42, #E65100)' }}
                >
                  <Mail size={15} />
                  Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/15 text-green-400 border border-green-500/20 text-sm font-medium hover:bg-green-500/25 transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/20 text-center p-8">
              <Mail size={40} className="mb-4" />
              <p className="font-display text-lg">Select a message to read</p>
              <p className="text-sm mt-1">Click any message from the inbox</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
