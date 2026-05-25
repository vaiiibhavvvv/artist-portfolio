import { useState, useEffect, useCallback } from 'react'
import type { Artwork } from '@/types'

interface UseArtworksOptions {
  category?: string
}

export function useArtworks({ category }: UseArtworksOptions = {}) {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArtworks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''
      const res = await fetch(`/api/artworks${params}`)
      if (!res.ok) throw new Error('Failed to fetch artworks')
      const data = await res.json()
      setArtworks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchArtworks()
  }, [fetchArtworks])

  const deleteArtwork = async (id: string) => {
    try {
      const res = await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setArtworks((prev) => prev.filter((a) => a.id !== id))
      return true
    } catch {
      return false
    }
  }

  const updateArtwork = async (id: string, data: Partial<Artwork>) => {
    try {
      const res = await fetch(`/api/artworks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      setArtworks((prev) => prev.map((a) => (a.id === id ? updated : a)))
      return true
    } catch {
      return false
    }
  }

  return { artworks, loading, error, refetch: fetchArtworks, deleteArtwork, updateArtwork }
}
