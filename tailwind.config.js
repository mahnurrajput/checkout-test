// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#faf6f0',
          deep: '#f2ece3',
          dark: '#efe7db',
        },
        ink: {
          DEFAULT: '#211d19',
          soft: '#5d554b',
          faint: '#8c8175',
        },
        line: '#e2d9cc',
        gold: {
          DEFAULT: '#9a6f2c',
          soft: '#c9a35c',
        },
        clay: '#8d4b32',
      },
      fontFamily: {
        // Wired to CSS variables set by next/font in app/layout.js —
        // NOT literal font-family strings, since Next self-hosts and
        // renames fonts internally.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      maxWidth: {
        page: '76rem',
      },
      transitionTimingFunction: {
        gallery: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};