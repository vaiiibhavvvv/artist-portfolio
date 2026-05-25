import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Ariana Silva — her journey, philosophy, and artistic vision.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
