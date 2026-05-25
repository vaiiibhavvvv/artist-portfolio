'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Images, MessageSquare, Eye, Upload, TrendingUp } from 'lucide-react'
import type { DashboardStats } from '@/types'

function StatCard({ icon: Icon, label, value, color, delay = 0 }: {
  icon: typeof Images; label: string; value: number; color: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl p-6 border border-white/8"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: color + '20' }}>
          <Icon size={20} style={{ color }} />
        </div>
        <TrendingUp size={14} className="text-green-400" />
      </div>
      <div className="font-display text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-white/40 text-sm">{label}</div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: Images, label: 'Total Artworks', value: stats?.totalArtworks || 0, color: '#FF8C42' },
    { icon: MessageSquare, label: 'Total Messages', value: stats?.totalMessages || 0, color: '#60A5FA' },
    { icon: Eye, label: 'Unread Messages', value: stats?.unreadMessages || 0, color: '#F59E0B' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="font-display text-3xl font-bold text-white mb-1">Welcome back! 👋</h2>
        <p className="text-white/40">Here&apos;s an overview of your art portfolio</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.1} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl p-6 border border-white/8"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <h3 className="text-white font-display font-semibold text-lg mb-5">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { href: '/admin/dashboard/upload', icon: Upload, label: 'Upload New Artwork', desc: 'Add a new piece to the gallery', color: '#FF8C42' },
              { href: '/admin/dashboard/gallery', icon: Images, label: 'Manage Gallery', desc: 'Edit, delete, or reorganize artworks', color: '#60A5FA' },
              { href: '/admin/dashboard/messages', icon: MessageSquare, label: 'View Messages', desc: `${stats?.unreadMessages || 0} unread messages`, color: '#F59E0B' },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-[#FF8C42]/25 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.color + '15' }}>
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">{item.label}</p>
                    <p className="text-white/30 text-xs">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent artworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 border border-white/8"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-display font-semibold text-lg">Recent Artworks</h3>
            <Link href="/admin/dashboard/gallery" className="text-[#FF8C42] text-xs hover:underline">View all</Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 h-14 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : stats?.recentArtworks?.length ? (
            <div className="space-y-3">
              {stats.recentArtworks.map((artwork) => (
                <div key={artwork.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={artwork.imageUrl} alt={artwork.title} width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/90 text-sm font-medium truncate">{artwork.title}</p>
                    <p className="text-white/30 text-xs">{artwork.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Images size={32} className="text-white/15 mb-3" />
              <p className="text-white/30 text-sm">No artworks uploaded yet</p>
              <Link href="/admin/dashboard/upload" className="text-[#FF8C42] text-xs mt-2 hover:underline">
                Upload your first artwork →
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
