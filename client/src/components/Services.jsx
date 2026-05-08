import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../data'
import { useAdminImage } from '../context/ImageContext'

const ServiceIcons = {
  'five-elements': () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <circle cx="14" cy="14" r="10" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <path d="M14 4 L17 10 L14 8 L11 10 Z" fill="#C9A84C" opacity="0.8" />
      <path d="M14 24 L17 18 L14 20 L11 18 Z" fill="#C9A84C" opacity="0.6" />
      <path d="M4 14 L10 11 L8 14 L10 17 Z" fill="#C9A84C" opacity="0.7" />
      <path d="M24 14 L18 11 L20 14 L18 17 Z" fill="#C9A84C" opacity="0.7" />
      <circle cx="14" cy="14" r="2.5" fill="#C9A84C" />
    </svg>
  ),
  lotus: () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <path d="M14 22 C12 19 6 16 7 11 C8 8 10 7 12.5 8 C13.2 8.3 13.7 9 14 9.8 C14.3 9 14.8 8.3 15.5 8 C18 7 20 8 21 11 C22 16 16 19 14 22Z" fill="#C9A84C" opacity="0.85" />
      <path d="M14 22 C14 19 10 16 10 12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
      <ellipse cx="14" cy="22" rx="1.5" ry="1" fill="#C9A84C" opacity="0.6" />
      <path d="M9 10 C6 9 5 11 6 13 C7 16 11 17 14 18" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M19 10 C22 9 23 11 22 13 C21 16 17 17 14 18" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  ),
  'water-drop': () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <path d="M14 5 C14 5 6 13 6 17 A8 8 0 0 0 22 17 C22 13 14 5 14 5Z" fill="#C9A84C" opacity="0.8" />
      <ellipse cx="11" cy="15" rx="2" ry="3" fill="rgba(255,255,255,0.15)" transform="rotate(-30 11 15)" />
      <circle cx="14" cy="19" r="1" fill="rgba(255,255,255,0.2)" />
    </svg>
  ),
  skin: () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <circle cx="14" cy="14" r="9" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      <path d="M10 10 Q14 8 18 10 Q20 14 18 18 Q14 20 10 18 Q8 14 10 10Z" fill="#C9A84C" opacity="0.7" />
      <circle cx="14" cy="14" r="3" fill="rgba(139,26,26,0.6)" />
      <circle cx="14" cy="14" r="1" fill="#C9A84C" />
    </svg>
  ),
  leaf: () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <path d="M7 21 C7 21 8 11 14 7 C20 3 22 7 22 7 C22 7 22 15 16 18 C12 20 9 21 7 21Z" fill="#C9A84C" opacity="0.8" />
      <path d="M7 21 L15 12" stroke="rgba(13,8,7,0.4)" strokeWidth="1" />
      <path d="M12 10 L14 14" stroke="rgba(13,8,7,0.25)" strokeWidth="0.8" />
      <path d="M15.5 9 L16.5 13" stroke="rgba(13,8,7,0.25)" strokeWidth="0.8" />
    </svg>
  ),
  om: () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <path d="M8 10 C8 7 10 6 12 7 C14 8 14 11 12 13 C14 13 16 14 16 16 C16 19 13 20 11 19" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M14 13 C16 12 18 13 19 15" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M8 17 C8 20 10 22 13 21" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M16 20 C16 22 18 23 20 22" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="20" cy="8" r="1.5" fill="#C9A84C" opacity="0.7" />
    </svg>
  ),
}

function TiltCard({ children, className, style, whileHover: whileHoverProp }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 40 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 40 })
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(201,168,76,0.1) 0%, transparent 60%)`
  )

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={whileHoverProp}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}>
      {/* Dynamic specular glow follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-[1.5rem] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowBg }}
      />
      {children}
    </motion.div>
  )
}

function ServiceCard({ svc }) {
  const Icon = ServiceIcons[svc.icon] || ServiceIcons.leaf
  const img = useAdminImage(`service_${svc.id}`, svc.image)
  return (
    <motion.div variants={cardVariants} className="group">
      <TiltCard
        className="relative rounded-[1.5rem] overflow-hidden cursor-pointer h-full"
        style={{ border: '1px solid rgba(201,168,76,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        whileHover={{ borderColor: 'rgba(201,168,76,0.35)', boxShadow: '0 30px 70px rgba(0,0,0,0.55)' }}>

        <div className="relative h-48 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
          <img src={img} alt={svc.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.95) 0%, rgba(13,8,7,0.4) 60%, transparent 100%)' }} />
          <div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139,26,26,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.3)', transform: 'translateZ(20px)' }}>
            <Icon />
          </div>
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)', transform: 'translateZ(20px)' }}>
            <ArrowUpRight size={14} className="text-gold" />
          </div>
        </div>

        <div className="p-5" style={{ background: '#1A100C', transform: 'translateZ(10px)' }}>
          <h3 className="font-playfair text-[1.05rem] font-medium mb-2 text-ivory group-hover:text-gold transition-colors duration-300">{svc.title}</h3>
          <p className="font-jost text-[0.82rem] leading-[1.75] mb-4 text-warmgrey/90 line-clamp-3">{svc.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {svc.conditions.slice(0, 4).map(c => (
              <span key={c} className="font-jost text-[0.58rem] font-semibold tracking-wider px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-gold/12"
                style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Services() {
  return (
    <section id="services" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #1A100C 0%, #0D0807 100%)' }} />
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0 0 C360 60 1080 60 1440 0 L1440 0 L0 0Z" fill="#0D0807" />
        </svg>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6" style={{ perspective: '1200px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20">
          <p className="section-label mb-3">What We Offer</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.4rem)] mt-3">
            Holistic <em className="text-gradient-gold not-italic">Healing</em><br />
            <span className="text-ivory/70 text-[clamp(1.5rem,3vw,2.5rem)] font-light">Under One Roof</span>
          </h2>
          <p className="font-cormorant text-[1.2rem] italic text-warmgrey mt-4 max-w-lg mx-auto leading-relaxed">
            Ancient therapies, modern diagnosis, and personalised care — all crafted for you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14 flex flex-wrap gap-4 justify-center">
          <Link to="/services" className="btn-outline inline-flex">
            View All Services
          </Link>
          <Link to="/book" className="btn-primary inline-flex">
            Book a Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
