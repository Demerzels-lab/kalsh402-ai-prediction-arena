/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. DEFINE YOUR COLOR PALETTE
      colors: {
        background: '#0a0a0f', // Near-black, slightly blue
        foreground: '#e0e0e0', // Soft white (not 100% white)
        muted: '#888888', // For paragraphs and descriptions
        card: 'rgba(10, 10, 15, 0.7)', // Your glassmorphism background

        primary: {
          DEFAULT: '#00f0ff', // Neon Cyan
          dark: '#00a0a0',
        },
        secondary: {
          DEFAULT: '#ff00ff', // Neon Magenta
          dark: '#a000a0',
        },
        accent: {
          DEFAULT: '#b026ff', // Neon Purple
          dark: '#7000a0',
        },
      },

      // 2. DEFINE YOUR FONTS
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },

      // 3. DEFINE YOUR BORDERS & GLOWS
      borderColor: {
        DEFAULT: 'rgba(0, 240, 255, 0.3)', // Default border (cyan)
        secondary: 'rgba(255, 0, 255, 0.3)', // Magenta border
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

module.exports = config; // Use module.exports for .js files