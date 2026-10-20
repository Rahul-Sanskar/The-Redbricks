import React from 'react'
import Seo from '../components/Seo.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import Reveal from '../components/Reveal.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'

const SERVICES = [
  {
    title: 'Residential Sales',
    body: 'Expert guidance for homebuyers seeking premium 2, 3, and 4 BHK residences across Navi Mumbai. We connect buyers with the right property at the right price.',
  },
  {
    title: 'Commercial Properties',
    body: 'Dedicated support for businesses, entrepreneurs, and investors seeking office spaces and retail units in Navi Mumbai\'s prime commercial precincts.',
  },
  {
    title: 'Sole Selling Partner',
    body: 'We act as the authorised sole selling agent for premium residential and commercial developments, delivering targeted marketing and qualified buyer introductions.',
  },
  {
    title: 'Investment Advisory',
    body: 'Personalised guidance for investors looking to build or diversify their real estate portfolio across Navi Mumbai\'s most promising micro-markets.',
  },
  {
    title: 'End-to-End Transaction Support',
    body: 'From the initial site visit to final possession, our team manages the entire transaction — documentation, negotiation, and handover.',
  },
  {
    title: 'Client Relationship Management',
    body: 'We build long-term relationships built on transparency and trust, ensuring every client receives the attention and service they deserve.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Services — The Redbricks"
        description="The Redbricks offers residential and commercial real estate services in Navi Mumbai — from homebuying guidance to sole-selling partnerships and investment advisory."
        canonical="/services/"
      />
      <Nav />
      <main id="main-content">
        {/* Page header */}
        <section className="pt-40 pb-16 bg-charcoal" aria-label="Services page header">
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow text-gold mb-4">What We Do</p>
            </Reveal>
            <Reveal delay={0.1} y={32}>
              <h1 className="font-display font-light text-display-xl text-ivory">
                Our <em className="italic text-gold">Services</em>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Services grid */}
        <section aria-labelledby="services-heading" className="section-pad bg-ivory">
          <div className="container-lux">
            <Reveal>
              <h2 id="services-heading" className="sr-only">Services we offer</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {SERVICES.map((svc, i) => (
                <Reveal key={svc.title} delay={i * 0.08} y={20}>
                  <article>
                    <span className="rule-gold w-8 mb-5" aria-hidden="true" />
                    <h3 className="font-display font-light text-display-md text-charcoal mb-3">{svc.title}</h3>
                    <p className="font-sans font-light text-stone text-sm leading-relaxed">{svc.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <EnquiryFooter />
      </main>
    </div>
  )
}
