'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Trash2, Edit3, Search, X, Check } from 'lucide-react'
import type { Artwork } from '@/types'

const CATEGORIES = ['All', 'Oil Painting', 'Watercolor', 'Acrylic', 'Digital Art', 'Mixed Media', 'Sculpture', 'Sketch']

export default function ManageGalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Artwork>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchArtworks()
  }, [])

  const fetchArtworks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/artworks')
      const data = await res.json()
      setArtworks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
      setArtworks(artworks.filter(a => a.id !== id))
      setDeletingId(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/artworks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      })
      const updated = await res.json()
      setArtworks(artworks.map(a => a.id === id ? updated : a))
      setEditingId(null)
      setEditData({})
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = artworks.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || a.category === category
    return matchesSearch && matchesCategory
  })

  const inputClass = 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#FF8C42]/60 transition-all text-sm'

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artworks..."
            className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#FF8C42]/60 transition-all text-sm"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#2d1810] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF8C42]/60"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Count */}
      <p className="text-white/30 text-sm mb-5">{filtered.length} artworks</p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-white/8 bg-white/4 animate-pulse h-64" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <p className="font-display text-xl">No artworks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl overflow-hidden border border-white/8"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {/* Image */}
                <div className="relative h-44">
                  <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => { setEditingId(artwork.id); setEditData({ title: artwork.title, description: artwork.description, category: artwork.category }) }}
                      className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FF8C42]/30 transition-colors"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => setDeletingId(artwork.id)}
                      className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Info / Edit form */}
                <div className="p-4">
                  {editingId === artwork.id ? (
                    <div className="space-y-2">
                      <input
                        value={editData.title || ''}
                        onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
                        className={inputClass}
                        placeholder="Title"
                      />
                      <select
                        value={editData.category || ''}
                        onChange={e => setEditData(d => ({ ...d, category: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-[#2d1810] border border-white/10 text-white text-sm"
                      >
                        {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(artwork.id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-[#FF8C42]/20 text-[#FF8C42] text-xs hover:bg-[#FF8C42]/30 transition-colors"
                        >
                          <Check size={14} /> Save
                        </button>
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-white/8 text-white/50 text-xs hover:bg-white/12 transition-colors"
                        >
                          <X size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-0.5">{artwork.category}</p>
                      <p className="text-white/90 font-display font-semibold truncate">{artwork.title}</p>
                      <p className="text-white/30 text-xs mt-1">
                        {new Date(artwork.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setDeletingId(null)} />
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative rounded-2xl p-8 border border-white/10 shadow-2xl max-w-sm w-full text-center"
              style={{ background: '#2d1810' }}
            >
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Delete Artwork?</h3>
              <p className="text-white/40 text-sm mb-6">This action cannot be undone. The artwork will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deletingId)}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/30 transition-colors font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-3 rounded-xl bg-white/8 text-white/60 text-sm hover:bg-white/12 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
