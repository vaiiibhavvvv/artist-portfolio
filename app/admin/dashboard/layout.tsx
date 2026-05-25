'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard, Upload, Images, MessageSquare, LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/dashboard/upload', icon: Upload, label: 'Upload Work' },
  { href: '/admin/dashboard/gallery', icon: Images, label: 'Manage Gallery' },
  { href: '/admin/dashboard/messages', icon: MessageSquare, label: 'Messages' },
]

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <motion.div
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#E65100] flex items-center justify-center shrink-0 shadow-lg">
          <span className="font-display text-white font-bold text-base">A</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-display font-semibold text-sm leading-none">Ariana Silva</p>
            <p className="text-white/30 text-xs mt-0.5">Art Studio Admin</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF8C42]/20 to-transparent border border-[#FF8C42]/20 text-[#FF8C42]'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium overflow-hidden">{label}</span>
                )}
                {!collapsed && isActive && (
                  <ChevronRight size={14} className="ml-auto text-[#FF8C42]/60" />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#FF8C42] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={12} /> : <X size={12} />}
      </button>
    </motion.div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const pathname = usePathname()

  const currentPage = navItems.find(n => n.href === pathname)

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #1a0f0d 0%, #2d1810 50%, #1a0f0d 100%)' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block relative">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 lg:hidden"
            >
              <Sidebar collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5"
          style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-white font-display font-semibold text-lg">
              {currentPage?.label || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
