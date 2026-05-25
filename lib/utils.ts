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

export const STUDIO = {
  name: 'Colorpalette Studio',
  shortName: 'Colorpalette',
  tagline: "Coloring the spaces words can't reach",
  phone: '+91 87963 01764',
  phoneRaw: '918796301764',
  email: 'studiocolorpalette@gmail.com',
  address: 'Saket, New Delhi',
  addressFull: 'Saket, New Delhi 110017',
  instagram: 'https://www.instagram.com/colorpalette_stud',
  facebook: 'https://www.facebook.com/share/1CPfqJzNG6/',
  whatsappMessage:
    'Hello Colorpalette Studio — I visited your website and would love to know more about your work.',
} as const

export const WHATSAPP_URL = `https://wa.me/${STUDIO.phoneRaw}?text=${encodeURIComponent(STUDIO.whatsappMessage)}`
export const TEL_URL = `tel:+${STUDIO.phoneRaw}`
