import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse the complete collection of artworks by Colorpalette Studio — oil paintings, watercolors, mixed media and more.',
}

export default function GalleryPage() {
  return <GalleryClient />
}
