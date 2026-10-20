import React from 'react'
import Seo from '../components/Seo.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import Reveal from '../components/Reveal.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import { STATS } from '../data/projects.js'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="About Us — The Redbricks"
        description="The Redbricks is a trusted real estate partner with 20+ years of expertise in premium residential and commercial real estate across Navi Mumbai."
        canonical="/about-us/"
      />
      <Nav />
      <main id="main-content">
        {/* Page header */}
        <section className="pt-40 pb-16 bg-charcoal" aria-label="About page header">
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow text-gold mb-4">Who We Are</p>
            </Reveal>
            <Reveal delay={0.1} y={32}>
              <h1 className="font-display font-light text-display-xl text-ivory">
                About <em className="italic text-gold">Redbricks</em>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Brand story */}
        <section aria-labelledby="about-heading" className="section-pad bg-ivory">
          <div className="container-lux">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <h2 id="about-heading" className="font-display font-light text-display-xl text-charcoal mb-8">
                    Where Commitment Meets <em className="italic text-brick">Exceptional</em> Sole Selling
                  </h2>
                </Reveal>
                <Reveal delay={0.1} y={16}>
                  <p className="font-sans font-light text-stone text-lg leading-relaxed mb-6">
                    REDBRICKS is a trusted property management company with more than 20 years of expertise,
                    dedicated to delivering exceptional properties to our valued clients and partners.
                    Specialising in the luxury real estate market, we pride ourselves on offering
                    personalised solutions tailored to the unique needs of every client.
                  </p>
                </Reveal>
                <Reveal delay={0.18} y={16}>
                  <p className="font-sans font-light text-stone text-lg leading-relaxed mb-10">
                    From first-time homebuyers to seasoned investors, our team combines deep local
                    knowledge with a commitment to transparency and excellence — helping you make
                    confident, well-informed property decisions across Navi Mumbai.
                  </p>
                </Reveal>
                <Reveal delay={0.24} y={12}>
                  <div className="flex flex-col gap-4">
                    {[
                      'Dedicated sole-selling partner for premium developments',
                      'End-to-end support from site selection to possession',
                      "Deep market knowledge across Navi Mumbai's key micro-markets",
                      'Transparent dealings with no hidden charges',
                    ].map((pt) => (
                      <div key={pt} className="flex items-start gap-4">
                        <span className="mt-2 w-4 h-px bg-gold shrink-0" aria-hidden="true" />
                        <p className="font-sans font-light text-stone text-base leading-relaxed">{pt}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-stone/20 border border-stone/20 self-start">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.1} y={12}>
                    <div className="bg-ivory px-6 py-8 text-center flex flex-col items-center gap-2">
                      <span className="font-display font-light text-5xl text-brick">{stat.value}</span>
                      <span className="eyebrow text-stone text-center leading-snug text-[0.6rem]">{stat.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mt-24 pt-16 border-t border-stone/20">
              <Reveal>
                <h2 className="font-display font-light text-display-xl text-charcoal mb-12">
                  Our <em className="italic text-brick">Leadership</em>
                </h2>
              </Reveal>
              <div className="flex flex-col sm:flex-row gap-10 max-w-lg">
                {[
                  { name: 'Founder',    img: '/images/founder.webp',    fallback: '/images/founder.png',    role: 'Founder, The Redbricks' },
                  { name: 'Co-Founder', img: '/images/co-founder.webp', fallback: '/images/co-founder.png', role: 'Co-Founder, The Redbricks' },
                ].map((person, i) => (
                  <Reveal key={person.name} delay={i * 0.12} className="flex-1">
                    <picture>
                      <source srcSet={person.img} type="image/webp" />
                      <img src={person.fallback} alt={person.role} className="aspect-[3/4] w-full object-cover object-top mb-4" loading="lazy" decoding="async" />
                    </picture>
                    <span className="rule-gold w-6 mb-2" aria-hidden="true" />
                    <p className="font-display font-light text-display-md text-charcoal">{person.name}</p>
                    <p className="font-sans text-xs text-stone">{person.role}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
        <EnquiryFooter />
      </main>
    </div>
  )
}
