import React from 'react'
import Seo from '../components/Seo.jsx'
import JsonLd, { ORGANIZATION_SCHEMA } from '../components/JsonLd.jsx'
import Nav from '../components/Nav.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Hero from '../components/Hero.jsx'
import BrandIntro from '../components/BrandIntro.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import LocationLifestyle from '../components/LocationLifestyle.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Premium Real Estate in Navi Mumbai"
        description="Discover premium residential and commercial real estate in Navi Mumbai with The Redbricks. 20+ years of expertise. Explore projects in Kharghar, Nerul, CBD Belapur and Vashi."
        canonical="/"
      />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <Nav />
      <main id="main-content">
        <Hero />
        <BrandIntro />
        <FeaturedProperties />
        <LocationLifestyle />
        <TrustStrip />
        <EnquiryFooter />
      </main>
    </div>
  )
}
