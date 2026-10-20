import React from 'react'
import Seo from '../components/Seo.jsx'
import Nav from '../components/Nav.jsx'
import SkipLink from '../components/SkipLink.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="All Projects"
        description="Explore all residential and commercial real estate projects by The Redbricks in Navi Mumbai — Kharghar, Nerul, CBD Belapur, Vashi and Thane."
        canonical="/projects/"
      />
      <Nav />
      <main id="main-content">
        {/* Page header */}
        <section className="pt-40 pb-16 bg-charcoal" aria-label="Projects page header">
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow text-gold mb-4">Our Portfolio</p>
            </Reveal>
            <Reveal delay={0.1} y={32}>
              <h1 className="font-display font-light text-display-xl text-ivory">
                All <em className="italic text-gold">Projects</em>
              </h1>
            </Reveal>
          </div>
        </section>
        <FeaturedProperties showAll />
        <EnquiryFooter />
      </main>
    </div>
  )
}
