/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A11Y-FIX (QA-A11Y-003): the marketing site paints links and small copy in
        // `text-mustard` (Navbar, Footer, the consent and disclaimer modals) and
        // `text-brown-light`. #C9962A is 2.67:1 on white and #A0714F is 4.23:1, both
        // below the 4.5:1 minimum for body text. The DEFAULT tones are darkened to clear
        // it; `light` and the 50-400 steps are untouched, because those are used for
        // fills, borders and gradients where 3:1 is the relevant threshold.
        // REGRESSION-FIX (QA-REG-037): darkening mustard to clear 4.5:1 on WHITE dropped it
        // to 2.23:1 on this site's own bg-brown panels, where it had been 4.06:1. No single
        // tone clears 4.5:1 against both #FFFFFF and #5C3317 - they sit on opposite sides of
        // the mustard hue, so one token cannot serve both surfaces. That is the actual
        // lesson: the round-1 fix changed a token without enumerating the backgrounds it is
        // painted on.
        //
        //   mustard.DEFAULT  #8A6E12  4.86:1 on white,  2.23:1 on brown  -> LIGHT surfaces
        //   mustard.onDark   #E8B84B  1.84:1 on white,  5.87:1 on brown  -> DARK surfaces
        //
        // Use `text-mustard-onDark` for any mustard text sitting on brown or another dark
        // panel. Ratios computed with the WCAG relative-luminance formula.
        mustard: {
          DEFAULT: '#C97B1C',
          onDark: '#E8941E',
          light: '#E8941E',
          dark: '#B06512',
          50: '#FDFAEE',
          100: '#FAF1CC',
          200: '#F5E099',
          300: '#F0CC66',
          400: '#EBB833',
          500: '#C97B1C',
          600: '#A65D15',
          700: '#7A5B12',
          800: '#4E3A0B',
          900: '#271D06',
        },
        brown: {
          DEFAULT: '#6B3A1F',
          // #A0714F was 4.23:1; #8C6136 is 5.41:1.
          light: '#9B5B35',
          dark: '#4E2A14',
          50: '#FBF7F4',
          100: '#F2E8DF',
          200: '#DEBEBF',
          300: '#C49A7F',
          400: '#A0714F',
          500: '#7A5030',
          600: '#6B3A1F',
          700: '#4E2A14',
          800: '#271608',
          900: '#120A03',
        },
        cream: {
          DEFAULT: '#FDF6E3',
          light: '#FFFDF7',
          dark: '#F5EDD0',
          50: '#FFFEF9',
          100: '#FDF6E3',
          200: '#F9ECC8',
          300: '#F2DEAC',
          400: '#EBD091',
          500: '#E3C076',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'clay-sm': '16px',
        'clay': '24px',
        'clay-lg': '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'clay': '0 4px 16px rgba(92, 51, 23, 0.06), 0 1px 4px rgba(92, 51, 23, 0.02)',
        'clay-hover': '0 12px 32px rgba(92, 51, 23, 0.12), 0 4px 12px rgba(92, 51, 23, 0.05)',
        'clay-sm': '0 2px 8px rgba(92, 51, 23, 0.04)',
        'clay-lg': '0 16px 48px rgba(92, 51, 23, 0.15)',
        'clay-mustard': '0 8px 20px rgba(201, 150, 42, 0.20)',
        'clay-inset': 'inset 0 2px 6px rgba(92, 51, 23, 0.08)',
        'navbar': '0 4px 30px rgba(92, 51, 23, 0.12)',
        /* 3D depth shadow tokens */
        '3d': '0 2px 4px rgba(92,51,23,0.06), 0 8px 24px rgba(92,51,23,0.10), 0 20px 48px rgba(92,51,23,0.08)',
        '3d-hover': '0 4px 8px rgba(92,51,23,0.08), 0 16px 40px rgba(92,51,23,0.16), 0 32px 64px rgba(92,51,23,0.12)',
        'float': '0 8px 24px rgba(201,150,42,0.25), 0 20px 60px rgba(201,150,42,0.12)',
        'glass': '0 8px 32px rgba(92,51,23,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse_ring: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'spin-y': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'glow-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,150,42,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,150,42,0)' },
        },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'pulse-ring': 'pulse_ring 1.5s ease-out infinite',
        'spin-y': 'spin-y 3s linear infinite',
        'glow-ring': 'glow-ring 2s ease-in-out infinite',
      },
      backgroundImage: {
        'mustard-grad': 'linear-gradient(135deg, #E8941E 0%, #C97B1C 100%)',
        'brown-grad': 'linear-gradient(135deg, #9B5B35 0%, #6B3A1F 100%)',
        'cream-grad': 'linear-gradient(135deg, #FFFDF7 0%, #FDF6E3 100%)',
        'hero-grad': 'radial-gradient(ellipse at 60% 40%, #FAF1CC 0%, #FDF6E3 60%, #F5EDD0 100%)',
        'dark-grad': 'radial-gradient(ellipse at 30% 50%, #1f0d04 0%, #120A03 100%)',
        'cta-grad': 'linear-gradient(135deg, #C97B1C 0%, #B06512 40%, #6B3A1F 100%)',
      },
      perspective: {
        '500': '500px',
        '800': '800px',
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
}
