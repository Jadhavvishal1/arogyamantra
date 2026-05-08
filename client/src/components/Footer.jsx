import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminImage } from '../context/ImageContext'

const links = {
  'Navigate': [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Shop', href: '/shop' },
    { label: 'Book Appointment', href: '/book' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  'Our Services': [
    { label: 'Panchabhoutik Chikitsa', href: '/services' },
    { label: 'Yoga Therapy', href: '/services' },
    { label: 'Panchakarma', href: '/services' },
    { label: 'Skinergy Clinic', href: '/services' },
    { label: 'Hair Regain Clinic', href: '/services' },
    { label: "Women's Health", href: '/services' },
  ],
  'Products': [
    { label: 'Hair Oil', href: '/shop' },
    { label: 'Abhyanga Tel', href: '/shop' },
    { label: 'Hair Shampoo', href: '/shop' },
    { label: 'Anti-Dandruff Shampoo', href: '/shop' },
    { label: 'Chyawan Prash', href: '/shop' },
    { label: 'Murabba (Amla)', href: '/shop' },
  ],
}

export default function Footer() {
  const logoImg = useAdminImage('logo_main', null)
  return (
    <footer style={{ background: 'linear-gradient(to bottom, #0D0807 0%, #080504 100%)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Top ornamental divider */}
        <div className="flex items-center gap-6 py-10">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.4">
            <path d="M16 4 C16 4 8 12 8 18 A8 8 0 0 0 24 18 C24 12 16 4 16 4Z" fill="#C9A84C" />
            <circle cx="16" cy="28" r="1.5" fill="#C9A84C" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-14">
          {/* Brand Column */}
          <div>
            <Link to="/" className="group flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 overflow-hidden"
                style={{ background: logoImg ? 'transparent' : 'radial-gradient(circle at 35% 35%, #A52020, #6B1010)', boxShadow: '0 0 15px rgba(139,26,26,0.3)' }}>
                {logoImg ? (
                  <img src={logoImg} alt="Arogya Mantra" className="w-full h-full object-contain" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18 C8 15 3 12 4 7.5 C5 5 7 4 9 5 C9.7 5.3 10.2 6 10 6.5 C9.8 6 10.3 5.3 11 5 C13 4 15 5 16 7.5 C17 12 12 15 10 18Z" fill="#C9A84C" opacity="0.9" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-[1rem] font-medium text-ivory group-hover:text-gold transition-colors duration-300">Arogya Mantra</span>
                <span className="font-jost text-[0.5rem] tracking-[0.2em] uppercase text-gold/60 mt-0.5">Ancient Wisdom · Modern Wellness</span>
              </div>
            </Link>

            <p className="font-jost text-[0.82rem] text-warmgrey leading-[1.85] mb-6 max-w-[240px]">
              Blending ancient Ayurvedic knowledge with modern science since 1995. Hadapsar, Pune — healing thousands of lives through holistic care.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5 mb-6">
              <a href="https://www.instagram.com/arogyamantraclinic/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(154,143,133,0.8)' }}
                title="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(154,143,133,0.8)' }}
                title="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.justdial.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(154,143,133,0.8)' }}
                title="Justdial">
                <span className="font-jost text-[0.58rem] font-bold">JD</span>
              </a>
            </div>

            {/* Quote in footer */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
              <p className="font-cormorant text-[0.9rem] italic text-gold/60 leading-relaxed">
                "आरोग्यं परमं भाग्यम्"
              </p>
              <p className="font-jost text-[0.58rem] text-warmgrey/50 mt-1 tracking-wider">Health is the greatest blessing</p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-playfair text-ivory text-[0.95rem] mb-5 font-medium">{heading}</h4>
              <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.href}
                      className="font-jost text-[0.8rem] text-warmgrey hover:text-gold transition-colors duration-300 flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors duration-300 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <p className="font-jost text-[0.68rem] text-warmgrey/50">
            © {new Date().getFullYear()} Arogya Mantra Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="font-jost text-[0.68rem] text-warmgrey/50 hover:text-gold/70 transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="font-jost text-[0.68rem] text-warmgrey/50 hover:text-gold/70 transition-colors duration-300">
              Privacy Policy
            </Link>
            <p className="font-jost text-[0.68rem] text-warmgrey/30">
              Hadapsar, Pune 411028
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
