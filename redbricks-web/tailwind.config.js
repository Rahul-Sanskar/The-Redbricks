/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Reset Tailwind's default screen sizes to match our exact breakpoints
    screens: {
      sm:  '480px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1440px',
    },
    extend: {
      // ─── COLOUR TOKENS ─────────────────────────────────────────
      colors: {
        // Background / surface
        white:    '#FFFFFF',
        offwhite: '#F7F5F2',   // warm near-white used by Emaar for sections
        ivory:    { DEFAULT: '#F9F6F0', dark: '#EDEBE6' },
        // Text
        charcoal: { DEFAULT: '#1A1A1A', light: '#2C2C2C' },
        // Stone — secondary text, borders, muted UI
        stone:    { DEFAULT: '#888278', light: '#B2ADA5', lighter: '#D6D2CC' },
        // Brand accent — The Redbricks brick red
        brick:    { DEFAULT: '#84251F', dark: '#6A1A15', light: '#A33028' },
        // Gold — very restrained decorative use only
        gold:     { DEFAULT: '#C9A96E', light: '#DFC090', dark: '#A88240' },
      },

      // ─── TYPOGRAPHY ─────────────────────────────────────────────
      fontFamily: {
        // Cormorant Garamond: headlines only, very light weight
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // DM Sans: all UI, body, labels, nav
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Emaar uses restrained headline sizes — grandeur from space not size
        'hero':       ['clamp(2.5rem,5.5vw,5rem)',   { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(2rem,4vw,3.75rem)',     { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.625rem,3vw,2.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.25rem,2vw,1.875rem)', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.1rem,1.5vw,1.5rem)',  { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        // UI text — used for labels, nav, metadata
        'ui-xs':  ['0.6875rem', { lineHeight: '1',    letterSpacing: '0.12em' }],
        'ui-sm':  ['0.75rem',   { lineHeight: '1.4',  letterSpacing: '0.04em' }],
        'ui-base':['0.875rem',  { lineHeight: '1.5',  letterSpacing: '0.01em' }],
        // Emaar eyebrow / category labels
        'label':  ['0.6875rem', { lineHeight: '1',    letterSpacing: '0.16em' }],
      },

      // ─── SPACING ────────────────────────────────────────────────
      spacing: {
        // Nav heights
        'nav':    '72px',   // Emaar desktop nav height
        'nav-sm': '60px',   // mobile nav height
        // Section vertical rhythm — generous Emaar spacing
        'section':    '8rem',    // lg sections
        'section-md': '5.5rem',  // medium sections
        'section-sm': '3.5rem',  // tight sections
        // Card proportions
        18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem',
        34: '8.5rem', 38: '9.5rem', 42: '10.5rem', 46: '11.5rem',
      },

      // ─── LAYOUT ─────────────────────────────────────────────────
      maxWidth: {
        site: '1440px',
        prose: '65ch',
        'prose-narrow': '52ch',
      },
      // Portrait card used for property listing (Emaar standard)
      aspectRatio: {
        'card-portrait': '3 / 4',
        'card-landscape': '16 / 9',
        'card-square': '1 / 1',
        'hero': '16 / 7',
      },

      // ─── SHADOWS — Emaar barely uses box shadows ─────────────────
      boxShadow: {
        // Only used when absolutely necessary
        'card': '0 1px 12px 0 rgba(26,26,26,0.06)',
        'nav':  '0 1px 0 0 rgba(26,26,26,0.08)',
      },

      // ─── TRANSITIONS ────────────────────────────────────────────
      transitionTimingFunction: {
        // Signature easing curve
        'emaar': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },

      // ─── KEYFRAMES ──────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-line': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'progress': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in 1s ease both',
        'slide-line': 'slide-line 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':    'shimmer 1.5s ease-in-out infinite',
        'progress':   'progress linear both',
      },
    },
  },
  plugins: [],
}
