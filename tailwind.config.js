/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-simbiotik-red/20',
    'text-simbiotik-red/40',
    'text-simbiotik-violet/20',
    'text-simbiotik-violet/40',
    'text-simbiotik-gold/20',
    'text-simbiotik-gold/40',
    'bg-simbiotik-red/60',
    'bg-simbiotik-violet/60',
    'bg-simbiotik-gold/60',
    'border-simbiotik-red/20',
    'border-simbiotik-violet/20',
    'border-simbiotik-gold/20',
    'border-simbiotik-red/40',
    'border-simbiotik-violet/40',
    'border-simbiotik-gold/40',
    'from-simbiotik-red/5',
    'from-simbiotik-violet/5',
    'from-simbiotik-gold/5',
  ],
  theme: {
    extend: {
      colors: {
        simbiotik: {
          deep: 'rgb(var(--color-simbiotik-deep) / <alpha-value>)',
          carbon: 'rgb(var(--color-simbiotik-carbon) / <alpha-value>)',
          graphite: 'rgb(var(--color-simbiotik-graphite) / <alpha-value>)',
          silver: 'rgb(var(--color-simbiotik-silver) / <alpha-value>)',
          chrome: 'rgb(var(--color-simbiotik-chrome) / <alpha-value>)',
          electric: 'rgb(var(--color-simbiotik-electric) / <alpha-value>)',
          violet: 'rgb(var(--color-simbiotik-violet) / <alpha-value>)',
          red: 'rgb(var(--color-simbiotik-red) / <alpha-value>)',
          gold: 'rgb(var(--color-simbiotik-gold) / <alpha-value>)',
        },
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-inverted': 'rgb(var(--color-text-inverted) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'Space Grotesk', 'sans-serif'],
        display: ['Neonblitz', 'Space Grotesk', 'sans-serif'],
        sub: ['Space Grotesk', 'Inter', 'sans-serif'],
        blitz: ['Neonblitz', 'sans-serif'],
      },
      backgroundImage: {
        'liquid-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
