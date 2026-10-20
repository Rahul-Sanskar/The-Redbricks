import React from 'react'
import Seo from '../components/Seo.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import Reveal from '../components/Reveal.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import { CONTACT } from '../data/projects.js'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Contact Us — The Redbricks"
        description="Get in touch with The Redbricks — premium real estate partners in Navi Mumbai. Call, email, or WhatsApp us to enquire about our projects."
        canonical="/contact-us/"
      />
      <Nav />
      <main id="main-content">
        {/* Page header */}
        <section className="pt-40 pb-16 bg-charcoal" aria-label="Contact page header">
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow text-gold mb-4">Speak To Us</p>
            </Reveal>
            <Reveal delay={0.1} y={32}>
              <h1 className="font-display font-light text-display-xl text-ivory">
                Contact <em className="italic text-gold">Us</em>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Quick contact details above the form */}
        <section aria-label="Contact details" className="section-pad-sm bg-ivory border-b border-stone/20">
          <div className="container-lux">
            <div className="flex flex-wrap gap-10">
              <Reveal delay={0}>
                <div>
                  <p className="eyebrow text-stone mb-2">Phone</p>
                  <a href={CONTACT.phoneHref} className="font-display font-light text-display-md text-charcoal hover:text-brick transition-colors">
                    {CONTACT.phone}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div>
                  <p className="eyebrow text-stone mb-2">Email</p>
                  <a href={CONTACT.emailHref} className="font-display font-light text-display-md text-charcoal hover:text-brick transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div>
                  <p className="eyebrow text-stone mb-2">WhatsApp</p>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="font-display font-light text-display-md text-charcoal hover:text-brick transition-colors">
                    Chat with us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Enquiry form via EnquiryFooter (already has the full validated form) */}
        <EnquiryFooter />
      </main>
    </div>
  )
}
