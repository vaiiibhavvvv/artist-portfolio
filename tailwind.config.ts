import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chocolate: { DEFAULT: '#4E342E', light: '#6D4C41', dark: '#3E2723' },
        cream: { DEFAULT: '#f8f5f0', dark: '#ede8e0' },
        'orange-accent': { DEFAULT: '#FF8C42', light: '#FFB07A', dark: '#E65100' },
        surface: {
          page: 'var(--surface-page)',
          card: 'var(--surface-card)',
          muted: 'var(--surface-muted)',
          elevated: 'var(--surface-elevated)',
        },
        ink: {
          strong: 'var(--text-strong)',
          base: 'var(--text-base)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        line: {
          subtle: 'var(--border-subtle)',
          soft: 'var(--border-soft)',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        elegant: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
