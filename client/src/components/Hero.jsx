import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useAdminImage } from '../context/ImageContext'

const STATS = [
  { num: 25, suffix: '+', label: 'Years of Practice' },
  { num: 4.8, suffix: '★', label: 'Justdial Rating' },
  { num: 96, suffix: '%', label: 'Practo Approval' },
  { num: 5000, suffix: '+', label: 'Lives Healed' },
]

function CountUp({ target, suffix, duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const isFloat = !Number.isInteger(target)
        const steps = 60
        const stepTime = duration / steps
        let i = 0
        const timer = setInterval(() => {
          i++
          const progress = i / steps
          const eased = 1 - Math.pow(1 - progress, 3)
          const cur = target * eased
          setVal(isFloat ? parseFloat(cur.toFixed(1)) : Math.floor(cur))
          if (i >= steps) clearInterval(timer)
        }, stepTime)
      }
    }, { threshold: 0.5 })
    if (node) obs.observe(node)
    return () => obs.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

// Floating particle component
function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay }}
    />
  )
}

const particles = [
  { x: '15%', y: '25%', size: 3, delay: 0, color: 'rgba(201,168,76,0.5)' },
  { x: '75%', y: '20%', size: 2, delay: 1, color: 'rgba(201,168,76,0.3)' },
  { x: '85%', y: '60%', size: 4, delay: 0.5, color: 'rgba(139,26,26,0.4)' },
  { x: '10%', y: '70%', size: 2, delay: 1.5, color: 'rgba(201,168,76,0.4)' },
  { x: '60%', y: '15%', size: 3, delay: 2, color: 'rgba(201,168,76,0.3)' },
  { x: '40%', y: '80%', size: 2, delay: 0.8, color: 'rgba(139,26,26,0.3)' },
  { x: '90%', y: '35%', size: 3, delay: 1.2, color: 'rgba(201,168,76,0.5)' },
  { x: '25%', y: '55%', size: 2, delay: 1.8, color: 'rgba(201,168,76,0.2)' },
]

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Hero() {
  const containerRef = useRef(null)
  const mandalaRef = useRef(null)
  const { scrollY } = useScroll()
  const heroBg = useAdminImage('hero_main', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1800&q=85')

  // Parallax transforms
  const bgY = useTransform(scrollY, [0, 600], [0, 120])
  const contentY = useTransform(scrollY, [0, 600], [0, -60])
  const mandalaY = useTransform(scrollY, [0, 600], [0, 80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Mandala rotation
  useEffect(() => {
    let frame, angle = 0
    const rotate = () => {
      angle += 0.005
      if (mandalaRef.current) {
        mandalaRef.current.style.transform = `translateY(-50%) rotate(${angle}rad)`
      }
      frame = requestAnimationFrame(rotate)
    }
    frame = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '100px' }}>

      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url('${heroBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
          }} />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg, rgba(13,8,7,0.97) 0%, rgba(13,8,7,0.85) 50%, rgba(13,8,7,0.5) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 80% at 75% 50%, rgba(139,26,26,0.12) 0%, transparent 70%)'
        }} />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* Animated Mandala */}
      <motion.div className="absolute right-[-4%] top-1/2 w-[min(700px,55vw)] pointer-events-none"
        style={{ y: mandalaY }}>
        <svg
          ref={mandalaRef}
          className="w-full opacity-[0.1]"
          viewBox="0 0 600 600"
          fill="none"
          style={{ transform: 'translateY(-50%)' }}>
          {[280, 240, 200, 160, 120, 80, 40].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r}
              stroke={i % 2 === 0 ? '#C9A84C' : '#8B1A1A'}
              strokeWidth="0.5" opacity="0.8" />
          ))}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
            <ellipse key={a} cx="300" cy="55" rx="9" ry="55" fill="#C9A84C" opacity="0.3"
              transform={`rotate(${a} 300 300)`} />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <ellipse key={a} cx="300" cy="155" rx="14" ry="70" fill="#8B1A1A" opacity="0.2"
              transform={`rotate(${a} 300 300)`} />
          ))}
          {[0, 60, 120, 180, 240, 300].map(a => (
            <path key={a}
              d="M300,200 L310,290 L300,300 L290,290 Z"
              fill="#C9A84C" opacity="0.3"
              transform={`rotate(${a} 300 300)`} />
          ))}
          <circle cx="300" cy="300" r="22" fill="#C9A84C" opacity="0.4" />
          <circle cx="300" cy="300" r="12" fill="#8B1A1A" opacity="0.8" />
          <circle cx="300" cy="300" r="4" fill="#C9A84C" opacity="1" />
        </svg>
      </motion.div>

      {/* Second smaller mandala - outer ring */}
      <div className="absolute right-[5%] top-1/2 w-[min(800px,65vw)] pointer-events-none opacity-[0.04]"
        style={{ transform: 'translateY(-50%) rotate(15deg)', animation: 'spin 120s linear infinite reverse' }}>
        <svg viewBox="0 0 600 600" fill="none">
          {[290, 260, 230].map(r => (
            <circle key={r} cx="300" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="4 8" />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-[680px] px-6 md:px-10 pb-24"
        style={{ y: contentY, opacity, marginLeft: 'max(24px, calc((100vw - 1200px) / 2))' }}>

        {/* Est badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
          <span className="font-jost text-[0.6rem] font-semibold tracking-[0.28em] uppercase text-gold/80">
            Est. 1995 · Hadapsar, Pune · 25+ Years of Healing
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
        </motion.div>

        {/* Sanskrit ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex items-center gap-4">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
          <span className="font-cormorant text-sm italic text-gold/50 tracking-wider">Ayurveda</span>
          <div className="h-px w-8" style={{ background: 'rgba(201,168,76,0.3)' }} />
        </motion.div>

        {/* Main heading with word-by-word reveal */}
        <div className="font-playfair leading-[1.05] mb-8 overflow-visible" style={{ perspective: '800px' }}>
          <div className="text-[clamp(3.2rem,7.5vw,6rem)] font-normal">
            {['Ancient', 'roots,'].map((word, i) => (
              <motion.span key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-4">
                {i === 0 ? <em className="text-gradient-gold not-italic">{word}</em> : <span className="text-ivory">{word}</span>}
              </motion.span>
            ))}
          </div>
          <div className="text-[clamp(2.2rem,5.5vw,4.4rem)] font-light mt-1">
            {['modern', 'healing.'].map((word, i) => (
              <motion.span key={word}
                custom={i + 2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-3 text-ivory/70">
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-[clamp(1.1rem,2.2vw,1.4rem)] text-ivory/65 italic leading-[1.8] mb-10 max-w-[480px]">
          Where five-thousand-year wisdom meets compassionate, personalised modern care — for your body, mind, and soul.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 mb-16">
          <Link to="/book" className="btn-primary group">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Book Consultation
          </Link>
          <Link to="/services" className="btn-outline group">
            Explore Services
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="border-t pt-8"
          style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-playfair text-[1.85rem] font-medium leading-none"
                  style={{ color: '#C9A84C' }}>
                  <CountUp target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-jost text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-warmgrey mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0D0807, transparent)' }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-jost text-[0.55rem] tracking-[0.3em] uppercase text-gold/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-gold/25 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-gold/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
