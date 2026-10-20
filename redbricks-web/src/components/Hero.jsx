import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * HERO SLIDES — uses only verified project images and real data.
 * Three slides drawn from the three most visually distinct projects.
 */
const SLIDES = [
  {
    id: 'celestia',
    image:    '/images/celestia-lg.jpg',
    imageWebp:'/images/celestia-lg.webp',
    alt:      'Celestia — premium residences, Kharghar',
    eyebrow:  'Residential · Upcoming',
    headline: 'Celestia',
    sub:      'Spacious 3 & 4 BHK residences in Kharghar, Navi Mumbai.',
    href:     '/projects/celestia/',
    cta:      'Explore Celestia',
  },
  {
    id: 'silver-crest',
    image:    '/images/silver-crest-lg.jpg',
    imageWebp:'/images/silver-crest-lg.webp',
    alt:      'Silver Crest — premium residences, Nerul',
    eyebrow:  'Residential · Upcoming',
    headline: 'Silver Crest',
    sub:      'Premium 2 & 3 BHK living in Nerul, Navi Mumbai.',
    href:     '/projects/silver-crest/',
    cta:      'Explore Silver Crest',
  },
  {
    id: 'trident',
    image:    '/images/trident-lg.jpg',
    imageWebp:'/images/trident-lg.webp',
    alt:      'Trident Elevation — commercial development, Mahape',
    eyebrow:  'Commercial · Ongoing',
    headline: 'Trident Elevation',
    sub:      'Premium office spaces and retail in Mahape MIDC, Navi Mumbai.',
    href:     '/projects/trident-elevation/',
    cta:      'Explore Trident',
  },
]

// Auto-advance interval in ms
const INTERVAL = 6000

export default function Hero() {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)   // 1 = forward, -1 = back
  const [paused, setPaused]       = useState(false)
  const prefersReduced             = useReducedMotion()
  const timerRef                   = useRef(null)
  const count                      = SLIDES.length

  // ── Auto-advance ──────────────────────────────────────────────────────────
  const advance = useCallback((dir = 1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + count) % count)
  }, [count])

  useEffect(() => {
    if (prefersReduced || paused) return
    timerRef.current = setInterval(() => advance(1), INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [prefersReduced, paused, advance])

  function goTo(idx) {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  // ── Slide transition variants ─────────────────────────────────────────────
  // Emaar: slow, elegant cross-dissolve — no aggressive slide movement
  const variants = {
    enter:  (d) => ({
      opacity: 0,
      scale:   prefersReduced ? 1 : 1.03,
      x:       prefersReduced ? 0 : d * 24,
    }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit:   (d) => ({
      opacity: 0,
      scale:   prefersReduced ? 1 : 0.98,
      x:       prefersReduced ? 0 : d * -24,
    }),
  }

  const TRANS = { duration: prefersReduced ? 0.2 : 1.1, ease: [0.4, 0, 0.2, 1] }

  const slide = SLIDES[current]

  return (
    <section
      aria-label="Featured properties"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: '100svh', minHeight: '580px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slide images (cross-dissolve) ─────────────────────────────────── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 z-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANS}
        >
          <picture>
            <source srcSet={slide.imageWebp} type="image/webp" />
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              loading={current === 0 ? 'eager' : 'lazy'}
              fetchpriority={current === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlay — Emaar uses a very restrained bottom gradient ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            'linear-gradient(to top,',
            'rgba(20,18,16,0.82) 0%,',
            'rgba(20,18,16,0.44) 30%,',
            'rgba(20,18,16,0.10) 58%,',
            'transparent 78%)',
          ].join(' '),
        }}
        aria-hidden="true"
      />

      {/* ── Slide content — bottom-left, Emaar positioning ────────────────── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
      >
        <div className="container-site">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide.id + '-text'}
              custom={direction}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
              transition={{ duration: prefersReduced ? 0.15 : 0.75, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              className="max-w-[640px]"
            >
              {/* Eyebrow — project type / status */}
              <p className="eyebrow-dark mb-4 text-white/70">
                {slide.eyebrow}
              </p>

              {/* Headline — the actual project name */}
              <h1 className="font-display font-light text-white mb-4"
                style={{ fontSize: 'clamp(2.4rem,5.5vw,5rem)', lineHeight: 1.04, letterSpacing: '-0.025em' }}>
                {slide.headline}
              </h1>

              {/* Sub — one verified sentence */}
              <p className="font-sans font-light text-white/70 mb-8 leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem,1.5vw,1.125rem)', maxWidth: '480px' }}>
                {slide.sub}
              </p>

              {/* CTA — Emaar style: inline text link with arrow */}
              <Link
                to={slide.href}
                className="btn-outline-light"
                aria-label={slide.cta}
              >
                {slide.cta}
                <ArrowRight />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Slide indicators + arrow controls — pinned bottom-right ────────── */}
      {/* Emaar uses thin horizontal progress bars, not dots */}
      <div
        className="absolute bottom-8 right-0 z-30 container-site
          flex items-center justify-end gap-6"
      >
        {/* Prev / Next arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => advance(-1)}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center
              border border-white/30 text-white/70
              hover:border-white hover:text-white
              transition-all duration-300 focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => advance(1)}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center
              border border-white/30 text-white/70
              hover:border-white hover:text-white
              transition-all duration-300 focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ── Progress bar indicators — bottom edge ────────────────────────── */}
      {/* Horizontal lines like Emaar, one per slide */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to ${s.headline}`}
            onClick={() => goTo(i)}
            className="relative flex-1 h-[3px] bg-white/20 overflow-hidden
              transition-colors duration-300 focus-visible:outline-none
              hover:bg-white/40 group"
          >
            {/* Animated fill */}
            {i === current && !prefersReduced ? (
              <motion.span
                className="absolute inset-0 bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: INTERVAL / 1000,
                  ease: 'linear',
                }}
              />
            ) : i < current ? (
              <span className="absolute inset-0 bg-white" />
            ) : null}
            <span className="sr-only">{s.headline}</span>
          </button>
        ))}
      </div>

      {/* ── Slide counter (desktop only) — Emaar shows "01 / 03" ────────────── */}
      <div
        className="absolute bottom-8 left-0 z-30 container-site hidden lg:block"
        aria-hidden="true"
      >
        <span className="font-sans text-[0.7rem] text-white/50 tracking-[0.1em]">
          {String(current + 1).padStart(2, '0')}
          <span className="mx-1.5 text-white/25">/</span>
          {String(count).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

/* ── Icon helpers ── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}
