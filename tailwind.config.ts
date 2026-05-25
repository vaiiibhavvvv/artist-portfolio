import type { Config } from 'tailwindcss'

const config: Config = {
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
