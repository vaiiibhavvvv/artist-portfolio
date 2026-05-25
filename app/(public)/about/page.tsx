import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Colorpalette Studio — our journey, our craft, and the way we work in Saket, New Delhi.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
