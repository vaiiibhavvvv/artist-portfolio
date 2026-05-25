'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, Calendar, Tag } from 'lucide-react'
import { ArtworkSkeleton } from '@/components/ui/Skeleton'
import { STUDIO } from '@/lib/utils'
import type { Artwork } from '@/types'

const CATEGORIES = ['All', 'Oil Painting', 'Watercolor', 'Acrylic', 'Digital Art', 'Mixed Media', 'Sculpture', 'Photography', 'Sketch']

// Demo artworks for display (replaced by real data via API)
const DEMO_ARTWORKS: Artwork[] = [
  { id: '1', title: 'Autumn Reverie', description: 'A study of light through October leaves, capturing the transient beauty of fall.', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', category: 'Oil Painting', tags: ['nature', 'autumn'], createdAt: '2024-01-15' },
  { id: '2', title: 'Ocean Whispers', description: 'The rhythm of waves translated into watercolor washes of blue and grey.', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80', category: 'Watercolor', tags: ['ocean', 'blue'], createdAt: '2024-02-10' },
  { id: '3', title: 'Golden Hour', description: 'That perfect moment when sunlight turns everything it touches to gold.', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326b24?w=800&q=80', category: 'Acrylic', tags: ['light', 'golden'], createdAt: '2024-03-05' },
  { id: '4', title: 'Abstract Souls', description: 'Exploring the formless nature of human connection through abstract forms.', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', category: 'Mixed Media', tags: ['abstract', 'emotion'], createdAt: '2024-01-28' },
  { id: '5', title: 'Silent Forest', description: 'Deep in an ancient woodland where light barely touches the earth.', imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80', category: 'Oil Painting', tags: ['forest', 'nature'], createdAt: '2023-12-20' },
  { id: '6', title: 'Celestial Dreams', description: 'A meditation on the infinite expanse of the cosmos and our place within it.', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80', category: 'Digital Art', tags: ['space', 'dreams'], createdAt: '2024-04-01' },
  { id: '7', title: 'Morning Light', description: 'The first light of dawn across rooftops, captured in delicate watercolor strokes.', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', category: 'Watercolor', tags: ['morning', 'city'], createdAt: '2024-02-28' },
  { id: '8', title: 'Portrait Study', description: 'A classical portrait study exploring shadow and form in the old master tradition.', imageUrl: 'https://images.unsplash.com/photo-1576400883215-7083980b6193?w=800&q=80', category: 'Sketch', tags: ['portrait', 'classical'], createdAt: '2023-11-15' },
  { id: '9', title: 'Desert Bloom', description: 'Life persisting against all odds — flowers in the heart of an arid wasteland.', imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80', category: 'Oil Painting', tags: ['desert', 'flowers'], createdAt: '2024-03-18' },
]

function ArtworkModal({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Image */}
        <div className="relative md:w-3/5 h-72 md:h-auto min-h-64">
          <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover" />
        </div>

        {/* Details */}
        <div className="md:w-2/5 p-8 overflow-y-auto flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF8C42]/10 text-[#FF8C42] text-xs font-medium mb-4 tracking-widest uppercase">
              {artwork.category}
            </span>
            <h2 className="font-display text-3xl font-bold text-[#4E342E] mb-3">{artwork.title}</h2>
            <p className="text-[#6D4C41]/70 leading-relaxed mb-6">{artwork.description}</p>

            <div className="flex items-center gap-2 text-[#6D4C41]/60 text-sm mb-3">
              <Calendar size={14} />
              <span>{new Date(artwork.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            {artwork.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-[#6D4C41]/60" />
                {artwork.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-[#f8f5f0] text-[#6D4C41] text-xs border border-[#4E342E]/10">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#4E342E]/8">
            <a
              href={`https://wa.me/${STUDIO.phoneRaw}?text=${encodeURIComponent(`Hello Colorpalette Studio, I'm interested in the artwork "${artwork.title}". Could you share more details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#4E342E] to-[#FF8C42] text-white text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Inquire About This Piece
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ArtworkCard({ artwork, onClick }: { artwork: Artwork; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-[#4E342E]/5 cursor-pointer transition-shadow duration-500"
      >
        <div className="relative overflow-hidden">
          <div className="aspect-auto">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 via-[#4E342E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Zoom icon */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn size={16} className="text-white" />
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[#FF8C42] text-xs tracking-widest uppercase mb-1 block">{artwork.category}</span>
            <h3 className="font-display text-white text-lg font-semibold leading-tight">{artwork.title}</h3>
          </div>
        </div>

        {/* Card footer always visible */}
        <div className="px-4 py-3 group-hover:opacity-0 transition-opacity duration-300">
          <p className="text-[#FF8C42] text-xs tracking-widest uppercase mb-0.5">{artwork.category}</p>
          <p className="font-display text-[#4E342E] font-semibold">{artwork.title}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryClient() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch('/api/artworks')
        if (res.ok) {
          const data = await res.json()
          setArtworks(data.length > 0 ? data : DEMO_ARTWORKS)
        } else {
          setArtworks(DEMO_ARTWORKS)
        }
      } catch {
        setArtworks(DEMO_ARTWORKS)
      } finally {
        setLoading(false)
      }
    }
    fetchArtworks()
  }, [])

  const filtered = activeCategory === 'All'
    ? artworks
    : artworks.filter((a) => a.category === activeCategory)

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#2C1A16]">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #FF8C42 0%, transparent 55%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#FF8C42] text-xs tracking-widest uppercase mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-4"
          >
            The Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-elegant text-white/60 text-xl italic"
          >
            {artworks.length > 0 ? `${artworks.length} works` : 'A collection of dreams made visible'}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-[var(--surface-card)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#4E342E] to-[#FF8C42] text-white shadow-md'
                    : 'bg-[var(--surface-muted)] text-[var(--text-strong)] hover:opacity-80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 px-6 md:px-12 bg-[var(--surface-page)]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6">
                  <ArtworkSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <p className="font-display text-2xl text-[var(--text-muted)]">No artworks in this category yet</p>
                </motion.div>
              ) : (
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                  <AnimatePresence>
                    {filtered.map((artwork) => (
                      <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                        onClick={() => setSelectedArtwork(artwork)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
