import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAdminImage } from '../context/ImageContext'

const credentials = [
  {
    svg: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5"><path d="M10 2L12 7H17L13 10.5L14.5 16L10 13L5.5 16L7 10.5L3 7H8L10 2Z" fill="#C9A84C" opacity="0.8"/></svg>,
    text: 'BAMS — Dhondumama Sathe Medical College, Pune (1995)',
  },
  {
    svg: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5"><path d="M10 17C10 17 3 12 3 7.5A4 4 0 0 1 10 4.17 4 4 0 0 1 17 7.5C17 12 10 17 10 17Z" fill="#C9A84C" opacity="0.8"/></svg>,
    text: 'YCB Level 6 — Ministry of AYUSH (Highest Yoga Certification)',
  },
  {
    svg: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5"><rect x="3" y="4" width="14" height="12" rx="1.5" stroke="#C9A84C" strokeWidth="1.2" opacity="0.8"/><path d="M7 9h6M7 12h4" stroke="#C9A84C" strokeWidth="1.2" opacity="0.8"/></svg>,
    text: 'Skin Department, KEM Hospital, Pune',
  },
  {
    svg: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5"><circle cx="10" cy="10" r="7" stroke="#C9A84C" strokeWidth="1.2" opacity="0.8"/><path d="M10 6v4l3 2" stroke="#C9A84C" strokeWidth="1.2" opacity="0.8"/></svg>,
    text: 'National & International Award Winner',
  },
  {
    svg: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5"><path d="M4 4h12v2H4zM4 8h8v2H4zM4 12h6v2H4z" fill="#C9A84C" opacity="0.8"/></svg>,
    text: 'Active Teacher & Conference Speaker',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function About() {
  const doctorImg = useAdminImage('about_doctor', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85')
  return (
    <section id="about" className="relative overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      {/* Background texture */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 90% 50%, rgba(139,26,26,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0D0807 0%, #1A100C 50%, #0D0807 100%)' }} />

      {/* Decorative corner ornament */}
      <svg className="absolute top-12 right-12 w-32 h-32 opacity-[0.06] pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M90 10 L50 10 M90 10 L90 50" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="90" cy="10" r="3" fill="#C9A84C" />
        <circle cx="50" cy="10" r="1.5" fill="#C9A84C" />
        <circle cx="90" cy="50" r="1.5" fill="#C9A84C" />
      </svg>

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* IMAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative order-2 lg:order-1">

            {/* Decorative frame lines */}
            <div className="absolute -top-5 -left-5 w-20 h-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
              <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
            </div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'linear-gradient(to left, #C9A84C, transparent)' }} />
              <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: 'linear-gradient(to top, #C9A84C, transparent)' }} />
            </div>

            {/* Main image */}
            <div className="relative rounded-[2rem] overflow-hidden border border-gold/15 shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              <motion.img
                src={doctorImg}
                alt="Vrushali Maisekar — Ayurvedic Doctor"
                className="w-full h-[560px] object-cover object-top"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.8) 0%, rgba(13,8,7,0.2) 50%, transparent 100%)' }} />

              {/* Name plate */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.5), transparent)' }} />
                  <span className="text-gold/50 text-[0.55rem] tracking-widest uppercase font-jost">Founder & Consultant</span>
                </div>
                <p className="font-playfair text-ivory text-2xl font-medium">Vrushali Maisekar</p>
                <p className="font-jost text-gold text-[0.6rem] tracking-[0.22em] uppercase mt-1">BAMS · YCB Level 6 · Cosmetologist</p>
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-4 w-28 h-28 rounded-full flex flex-col items-center justify-center z-10 border-[5px] border-ink2"
              style={{ background: 'radial-gradient(circle at 35% 35%, #D4B45A, #C9A84C)' }}>
              <span className="font-playfair text-3xl font-bold text-ink leading-none">25+</span>
              <span className="font-jost text-[0.45rem] font-bold tracking-widest uppercase text-ink/70 mt-1 text-center">Years<br />Legacy</span>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -left-6 top-16 backdrop-blur-xl rounded-2xl px-5 py-4 border"
              style={{
                background: 'rgba(13,8,7,0.9)',
                borderColor: 'rgba(201,168,76,0.2)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}>
              <p className="font-playfair text-2xl text-gold">4.8 ★</p>
              <p className="font-jost text-[0.6rem] text-warmgrey tracking-widest uppercase mt-1">Justdial · 42 Reviews</p>
            </motion.div>
          </motion.div>

          {/* TEXT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2">

            <p className="section-label mb-3">Our Story</p>
            <div className="gold-line" />

            <h2 className="font-playfair text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.1] mt-2 mb-6">
              Meet <em className="text-gradient-gold not-italic">Vrushali</em><br />
              <span className="text-ivory/80">Maisekar</span>
            </h2>

            <p className="font-jost text-ivory/70 leading-[1.95] text-[0.93rem] mb-5">
              The pioneer and primary consultant of <strong className="text-gold/80 font-medium">Arogya Mantra Clinic</strong> — one of Hadapsar's most prestigious Ayurvedic centres since 1995. Trained under the legendary Late Vaidya A.V. Datar Shastri and renowned Dr. Vivek Haldavnekar.
            </p>

            {/* Decorative quote */}
            <div className="relative mb-8 pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), rgba(201,168,76,0.1))' }} />
              <p className="font-cormorant text-[1.2rem] italic text-ivory/60 leading-relaxed">
                "Blending ancient knowledge with modern science is what makes Arogya Mantra stand apart. Each patient receives individual care with attention to every detail."
              </p>
            </div>

            {/* Credentials */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2.5 mb-10">
              {credentials.map((c, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-start gap-3 p-3.5 rounded-xl border transition-colors duration-300 hover:border-gold/25"
                  style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}>
                  {c.svg}
                  <span className="font-jost text-[0.83rem] text-ivory/65 leading-snug">{c.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary">
                Book Consultation
              </Link>
              <Link to="/about" className="btn-outline">
                Read Full Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
