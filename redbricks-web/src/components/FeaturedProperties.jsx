import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

// Filter categories matching actual data values
const FILTERS = [
  { label: 'All',         test: () => true },
  { label: 'Residential', test: (p) => p.type === 'Residential' },
  { label: 'Commercial',  test: (p) => p.type === 'Commercial' },
  { label: 'Ongoing',     test: (p) => p.status === 'Ongoing' },
  { label: 'Upcoming',    test: (p) => p.status === 'Upcoming' },
]

/**
 * FeaturedProperties
 * - showAll: when true (ProjectsPage) renders a 3-col grid instead of
 *   the homepage horizontal scroll.
 */
export default function FeaturedProperties({ showAll = false }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const prefersReduced             = useReducedMotion()
  const scrollRef                  = useRef(null)

  const filtered = PROJECTS.filter(FILTERS[activeIdx].test)

  // Horizontal scroll helpers (homepage only)
  function scrollBy(n) {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const w    = card ? card.offsetWidth + 20 : 320
    el.scrollBy({ left: n * w, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="projects-heading" className="bg-white">

      {/* ── Section header ────────────────────────────────────────────── */}
      <div className="container-site pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          {/* Heading */}
          <div>
            <p className="section-label mb-5">Our Portfolio</p>
            <h2
              id="projects-heading"
              className="font-display font-light text-charcoal"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
            >
              {showAll ? 'All Projects' : 'Featured Projects'}
            </h2>
          </div>

          {/* View all — only on homepage */}
          {!showAll && (
            <Link to="/projects/" className="btn-text shrink-0 mb-1">
              View All
              <ArrowRight />
            </Link>
          )}
        </div>

        {/* ── Filter tabs — Emaar underline style, NOT pill buttons ─────── */}
        <div
          role="tablist"
          aria-label="Filter projects"
          className="flex items-end gap-0 mt-10 border-b border-stone/12 overflow-x-auto scrollbar-none"
        >
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx(i)}
              className={`relative shrink-0 pb-3 px-4 font-sans text-ui-sm tracking-[0.04em]
                transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick
                ${activeIdx === i ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
            >
              {f.label}
              {/* Active underline — animates from 0 to full width */}
              {activeIdx === i && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-charcoal"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      {showAll ? (
        /* ── Grid layout (Projects page) ── */
        <div className="container-site pb-20 md:pb-28">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout={!prefersReduced}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} project={p} index={i} prefersReduced={prefersReduced} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="font-sans text-stone text-center py-20">No projects found.</p>
          )}
        </div>
      ) : (
        /* ── Horizontal scroll (Homepage) ── */
        <div className="relative">
          {/* Card strip — edge-to-edge, starts at container left margin */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory
              pl-5 md:pl-10 lg:pl-14 xl:pl-16 pr-5 pb-12"
            style={{ paddingLeft: 'max(1.25rem, calc((100vw - 1440px) / 2 + 4rem))' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PropertyCard
                  key={p.id}
                  project={p}
                  index={i}
                  prefersReduced={prefersReduced}
                  horizontal
                />
              ))}
            </AnimatePresence>

            {/* "View all" ghost card at the end */}
            {!showAll && filtered.length > 0 && (
              <div
                data-card
                className="snap-start shrink-0 flex items-center justify-center
                  border border-stone/20 hover:border-charcoal transition-colors duration-300"
                style={{ width: 'clamp(240px, 28vw, 320px)', aspectRatio: '3/4' }}
              >
                <Link to="/projects/" className="flex flex-col items-center gap-4 p-8 text-center">
                  <span className="font-display font-light text-charcoal"
                    style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>
                    Explore All Projects
                  </span>
                  <span className="w-10 h-10 border border-charcoal/30 flex items-center justify-center
                    group-hover:border-charcoal transition-colors">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* ── Scroll arrows — bottom-right, Emaar style ── */}
          <div className="container-site flex justify-end gap-3 pb-8 -mt-6">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="w-10 h-10 border border-stone/30 flex items-center justify-center
                text-stone hover:border-charcoal hover:text-charcoal
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="w-10 h-10 border border-stone/30 flex items-center justify-center
                text-stone hover:border-charcoal hover:text-charcoal
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PropertyCard
   Portrait 3:4 ratio, minimal metadata, no box-shadow, image-led.
   Matches Emaar India's property card layout exactly.
───────────────────────────────────────────────────────────────────────────── */
function PropertyCard({ project, index, prefersReduced, horizontal = false }) {
  const DELAY = prefersReduced ? 0 : index * 0.045

  const card = (
    <motion.article
      layout={!prefersReduced}
      data-card
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: DELAY, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`group shrink-0 snap-start ${
        horizontal
          ? '' // width set inline below
          : 'w-full'
      }`}
      style={horizontal
        ? { width: 'clamp(240px, 28vw, 320px)' }
        : {}
      }
    >
      <Link
        to={`/projects/${project.slug}/`}
        className="block focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-brick"
        aria-label={`Explore ${project.name}, ${project.location}`}
      >
        {/* ── Image — portrait 3:4 ── */}
        <div className="overflow-hidden relative" style={{ aspectRatio: '3/4' }}>
          <img
            src={project.portraitImage || project.image}
            alt={project.name}
            className="w-full h-full object-cover
              transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:scale-[1.05]"
            loading="lazy"
            decoding="async"
          />

          {/* Status badge — Emaar places this top-left, very minimal */}
          <span
            className={`absolute top-4 left-4
              font-sans text-[0.6rem] tracking-[0.14em] uppercase
              px-2.5 py-1
              ${project.status === 'Upcoming'
                ? 'bg-brick text-white'
                : 'bg-charcoal/75 text-white'
              }`}
          >
            {project.status}
          </span>
        </div>

        {/* ── Card metadata — minimal, below image ── */}
        <div className="pt-4 pb-2">
          {/* Category — small-caps eyebrow */}
          <p className="font-sans text-[0.65rem] tracking-[0.14em] uppercase text-stone mb-1.5">
            {project.type} · {project.config}
          </p>

          {/* Project name */}
          <h3
            className="font-display font-light text-charcoal mb-1
              group-hover:text-brick transition-colors duration-300"
            style={{ fontSize: 'clamp(1.1rem,2vw,1.375rem)', lineHeight: 1.2 }}
          >
            {project.name}
          </h3>

          {/* Location */}
          <p className="font-sans text-ui-sm text-stone/80 mb-4">
            {project.location}
          </p>

          {/* Discover link — Emaar-style text link */}
          <span
            className="inline-flex items-center gap-2 font-sans text-ui-xs
              tracking-[0.1em] uppercase text-charcoal/60
              group-hover:text-brick group-hover:gap-3.5
              transition-all duration-300"
            aria-hidden="true"
          >
            Discover
            <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-7" />
          </span>
        </div>
      </Link>
    </motion.article>
  )

  return card
}

/* ── Shared icons ── */
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
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
