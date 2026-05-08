import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ImageProvider } from './context/ImageContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import ShopPage from './pages/ShopPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import AdminPage from './pages/AdminPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

// Scroll to hash after navigation
function ScrollToHash() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash, pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <ImageProvider>
      <ScrollToHash />
      <Navbar />
      <CartDrawer />
      <WhatsAppFab />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
          <Route path="/book" element={<PageWrapper><BookingPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><GalleryPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
    </ImageProvider>
  )
}
