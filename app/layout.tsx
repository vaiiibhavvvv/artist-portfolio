import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: { default: 'Ariana Silva | Fine Art Portfolio', template: '%s | Ariana Silva Art' },
  description: 'Explore the exquisite artwork of Ariana Silva — an award-winning fine artist specializing in oil paintings, watercolors, and mixed media.',
  keywords: ['artist', 'fine art', 'oil painting', 'watercolor', 'portfolio', 'gallery'],
  openGraph: {
    type: 'website',
    siteName: 'Ariana Silva Art',
    title: 'Ariana Silva | Fine Art Portfolio',
    description: 'Explore the exquisite artwork of Ariana Silva.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
