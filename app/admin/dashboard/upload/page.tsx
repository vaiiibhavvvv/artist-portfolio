'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Upload, ImagePlus, X, CheckCircle, Tag } from 'lucide-react'

const CATEGORIES = ['Oil Painting', 'Watercolor', 'Acrylic', 'Digital Art', 'Mixed Media', 'Sculpture', 'Sketch', 'Photography']

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [imageData, setImageData] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      setPreview(data)
      setImageData(data)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageData || !title || !category) {
      setError('Please fill in all required fields and select an image.')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Upload image
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error)

      // Save artwork
      const artworkRes = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, imageUrl: uploadData.url, category, tags }),
      })
      if (!artworkRes.ok) throw new Error('Failed to save artwork')

      setSuccess(true)
      setPreview(null)
      setImageData(null)
      setTitle('')
      setDescription('')
      setCategory('')
      setTags([])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#FF8C42]/60 transition-all duration-300 text-sm'

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6"
          >
            <CheckCircle size={18} />
            Artwork uploaded successfully! It is now live in your gallery.
            <button onClick={() => setSuccess(false)} className="ml-auto">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl p-8 border border-white/8 space-y-6" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {/* Image Upload Zone */}
          <div>
            <label className="text-white/60 text-xs tracking-widest uppercase mb-3 block">Artwork Image *</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                preview ? 'border-[#FF8C42]/40' : 'border-white/15 hover:border-[#FF8C42]/40'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {preview ? (
                <div className="relative">
                  <Image src={preview} alt="Preview" width={600} height={400} className="w-full h-72 object-cover rounded-2xl" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPreview(null); setImageData(null) }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF8C42]/10 flex items-center justify-center mb-4">
                    <ImagePlus size={28} className="text-[#FF8C42]" />
                  </div>
                  <p className="text-white/60 font-medium mb-1">Drop your artwork here</p>
                  <p className="text-white/30 text-sm">or click to browse — PNG, JPG, WEBP up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">Artwork Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Autumn Reverie"
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the inspiration, technique, or story behind this piece..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={`${inputClass} bg-[#2d1810]`}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button type="button" onClick={addTag}
                className="px-4 py-3 rounded-xl bg-[#FF8C42]/15 text-[#FF8C42] hover:bg-[#FF8C42]/25 transition-colors"
              >
                <Tag size={16} />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 text-white/60 text-xs border border-white/10">
                    #{tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-red-400 transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={uploading}
            whileHover={{ scale: uploading ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white text-sm tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FF8C42, #E65100)',
              boxShadow: uploading ? 'none' : '0 8px 25px rgba(255,140,66,0.3)',
              opacity: uploading ? 0.7 : 1,
            }}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading Artwork...
              </>
            ) : (
              <>
                <Upload size={16} />
                Publish Artwork
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  )
}
