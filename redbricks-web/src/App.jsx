import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// HomePage is eagerly loaded — it is the critical first render
import HomePage from './pages/HomePage.jsx'

// All other routes are lazy-loaded — each becomes a separate JS chunk
const ProjectsPage      = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage.jsx'))
const AboutPage         = lazy(() => import('./pages/AboutPage.jsx'))
const ServicesPage      = lazy(() => import('./pages/ServicesPage.jsx'))
const ContactPage       = lazy(() => import('./pages/ContactPage.jsx'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage.jsx'))

// Thin loading bar shown while a lazy chunk is fetching
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-ivory" aria-busy="true" aria-label="Loading page">
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, #84251F 0%, #C9A96E 50%, #84251F 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/projects/"         element={<ProjectsPage />} />
          <Route path="/projects/:slug/"   element={<ProjectDetailPage />} />
          {/* Static content pages */}
          <Route path="/about-us/"         element={<AboutPage />} />
          <Route path="/services/"         element={<ServicesPage />} />
          <Route path="/contact-us/"       element={<ContactPage />} />
          {/* Legacy directory URLs — map to new project detail route */}
          <Route path="/directory/:slug/"  element={<ProjectDetailPage />} />
          {/* 404 */}
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
