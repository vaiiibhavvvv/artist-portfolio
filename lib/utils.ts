import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const ARTWORK_CATEGORIES = [
  'All',
  'Oil Painting',
  'Watercolor',
  'Acrylic',
  'Digital Art',
  'Sculpture',
  'Photography',
  'Mixed Media',
  'Sketch',
]

export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '1234567890'
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello, I visited your portfolio website and I would like to know more about your artwork.'
)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
