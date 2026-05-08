import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAdminImage } from '../context/ImageContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const logoImg = useAdminImage('logo_main', null)

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(to right, rgba(139,26,26,0.8), #C9A84C, rgba(201,168,76,0.6))',
        }}
      />

      {/* Quote bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[28px] flex items-center justify-center"
        style={{ background: 'linear-gradient(90deg, #0D0807, #1A0C0A 50%, #0D0807)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <p className="font-cormorant text-[0.78rem] italic text-gold/70 tracking-wide text-center px-4">
          आरोग्यं परमं भाग्यम् &nbsp;—&nbsp; <span className="text-ivory/40 font-light not-italic text-[0.72rem]">Health is the greatest blessing</span>
        </p>
      </div>

      {/* Main Nav */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(13,8,7,0.97)' : 'rgba(13,8,7,0)',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.6)' : 'none',
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-[28px] left-0 right-0 z-50 backdrop-blur-xl"
        style={{ borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent' }}>

        {scrolled && (
          <motion.div className="absolute top-0 left-0 right-0 h-[1px]"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6 }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6) 30%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.6) 70%, transparent)' }} />
        )}

        <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
          <div className="flex items-center h-[66px] gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105 overflow-hidden"
                style={{
                  background: logoImg ? 'transparent' : 'radial-gradient(circle at 35% 35%, #B52020 0%, #6B1010 70%)',
                  boxShadow: '0 0 16px rgba(139,26,26,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}>
                {logoImg ? (
                  <img src={logoImg} alt="Arogya Mantra" className="w-full h-full object-contain" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21C9.5 17.5 4 14 5 9C6 6 8 5 10 6C10.8 6.4 11.4 7.2 12 8C12.6 7.2 13.2 6.4 14 6C16 5 18 6 19 9C20 14 14.5 17.5 12 21Z" fill="#C9A84C" opacity="0.95"/>
                    <ellipse cx="10" cy="11" rx="1.5" ry="2.5" fill="rgba(255,255,255,0.15)" transform="rotate(-20 10 11)"/>
                  </svg>
                )}
              </div>
              <span className="font-playfair text-[1.05rem] font-medium text-ivory group-hover:text-gold transition-colors duration-300 tracking-wide">
                Arogya Mantra
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map(link => (
                <NavLink key={link.label} link={link} active={isActive(link.href)} />
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button onClick={toggleCart}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                style={{ border: '1px solid rgba(201,168,76,0.18)' }}>
                <ShoppingBag size={14} className="text-ivory/70" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-ink text-[0.48rem] font-bold flex items-center justify-center">
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link to="/book"
                className="relative overflow-hidden px-5 py-2 font-jost text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B1A1A, #A52020)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  boxShadow: '0 4px 20px rgba(139,26,26,0.35)',
                }}>
                Book Now
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button onClick={toggleCart} className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                <ShoppingBag size={14} className="text-ivory" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-ink text-[0.45rem] font-bold flex items-center justify-center">{totalItems}</span>
                )}
              </button>
              <button
                onClick={() => { setMobileOpen(!mobileOpen); document.body.style.overflow = mobileOpen ? '' : 'hidden' }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                {mobileOpen ? <X size={15} className="text-ivory" /> : <Menu size={15} className="text-ivory" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(8,4,3,0.98)', backdropFilter: 'blur(20px)', paddingTop: '94px' }}>

            <div className="flex flex-col items-center justify-center flex-1 gap-1 pb-16">
              {/* Ornament */}
              <div className="flex items-center gap-4 mb-8 w-40">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
                <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.7"/></svg>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
              </div>

              {navLinks.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}>
                  <Link to={link.href}
                    onClick={() => { setMobileOpen(false); document.body.style.overflow = '' }}
                    className="block py-3 px-6 font-playfair text-[2rem] text-ivory hover:text-gold transition-colors duration-300 text-center">
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-8">
                <Link to="/book"
                  onClick={() => { setMobileOpen(false); document.body.style.overflow = '' }}
                  className="btn-primary text-[0.7rem] px-8 py-3.5">
                  Book Consultation
                </Link>
              </motion.div>

              <p className="font-jost text-[0.55rem] text-warmgrey/30 tracking-[0.3em] uppercase mt-10">Est. 1995 · Hadapsar, Pune</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ link, active }) {
  return (
    <Link to={link.href}
      className="relative px-4 py-2 font-jost text-[0.68rem] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 group"
      style={{ color: active ? '#C9A84C' : 'rgba(245,236,215,0.6)' }}>
      <span className="relative z-10 group-hover:text-gold transition-colors duration-300">{link.label}</span>
      {active && (
        <motion.span layoutId="nav-indicator"
          className="absolute bottom-0.5 left-4 right-4 h-px bg-gold"
          style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
      )}
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(201,168,76,0.05)' }} />
    </Link>
  )
}
