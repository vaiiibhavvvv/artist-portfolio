import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'Colorpalette Studio | Art that colors the unsayable',
    template: '%s | Colorpalette Studio',
  },
  description:
    "Colorpalette Studio is a Delhi-based art studio where every shade tells a story. Coloring the spaces words can't reach — paintings, commissions, and custom artwork from Saket, New Delhi.",
  keywords: [
    'Colorpalette Studio',
    'art studio Delhi',
    'Saket art studio',
    'paintings Delhi',
    'commissioned art',
    'fine art India',
    'oil painting',
    'watercolor',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Colorpalette Studio',
    title: 'Colorpalette Studio | Art that colors the unsayable',
    description: "Coloring the spaces words can't reach. A Delhi-based art studio.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
