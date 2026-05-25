import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Colorpalette Studio for commissions, exhibitions, and art inquiries.',
}

export default function ContactPage() {
  return <ContactClient />
}
