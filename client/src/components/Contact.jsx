import { motion } from 'framer-motion'

const details = [
  {
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C6.24 1 4 3.24 4 6c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" fill="rgba(139,26,26,0.7)" stroke="rgba(139,26,26,0.9)" strokeWidth="0.5"/>
        <circle cx="9" cy="6" r="2" fill="#C9A84C" opacity="0.9"/>
      </svg>
    ),
    label: 'Main Clinic',
    value: '501, City Center, Opposite Vaibhav Complex, Hadapsar, Pune — 411028',
  },
  {
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C6.24 1 4 3.24 4 6c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" fill="rgba(139,26,26,0.5)" stroke="rgba(139,26,26,0.7)" strokeWidth="0.5"/>
        <circle cx="9" cy="6" r="2" fill="#C9A84C" opacity="0.7"/>
      </svg>
    ),
    label: 'Hair Regain Clinic',
    value: 'Angan Complex, First Floor, Magarpatta Road, Hadapsar, Pune — 411028',
  },
  {
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 4.5C3 3.7 3.7 3 4.5 3h1.8l1 3-1.3 1.3c1 2 2.7 3.7 4.7 4.7L12 10.7l3 1V13.5c0 .8-.7 1.5-1.5 1.5C7.1 15 3 10.9 3 5.5v-1z" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.8)" strokeWidth="1"/>
      </svg>
    ),
    label: 'Phone / WhatsApp',
    value: '+91-9545453720',
  },
  {
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="rgba(201,168,76,0.6)" strokeWidth="1"/>
        <path d="M9 5v4l2.5 2.5" stroke="rgba(201,168,76,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Clinic Hours',
    value: 'Monday – Saturday · 5:30 PM – 8:00 PM',
  },
  {
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="rgba(201,168,76,0.6)" strokeWidth="1"/>
        <path d="M2 7l7 4 7-4" stroke="rgba(201,168,76,0.9)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email',
    value: 'contact@arogyamantra.com',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0D0807 0%, #1A100C 50%, #0D0807 100%)' }}>
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(139,26,26,0.05) 0%, transparent 70%)' }} />

      {/* Decorative corner SVG */}
      <svg className="absolute bottom-12 right-12 w-28 h-28 opacity-[0.05] pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 L10 50 M10 90 L50 90" stroke="#C9A84C" strokeWidth="0.6" />
        <circle cx="10" cy="90" r="3" fill="#C9A84C" />
        <circle cx="50" cy="90" r="1.5" fill="#C9A84C" />
        <circle cx="10" cy="50" r="1.5" fill="#C9A84C" />
      </svg>

      <div className="relative max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14">
          <p className="section-label">Find Us</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,4vw,3rem)] mt-2">
            Visit <em className="text-gold not-italic">Arogya Mantra</em>
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey/70 mt-3 max-w-lg mx-auto">
            Located in the heart of Hadapsar, Pune — healing thousands since 1995
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-2 space-y-3">
            {details.map((d, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 p-4 rounded-xl border transition-all duration-300 cursor-default group"
                style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.background = 'rgba(201,168,76,0.02)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ background: 'rgba(139,26,26,0.12)', border: '1px solid rgba(139,26,26,0.25)' }}>
                  {d.svg}
                </div>
                <div>
                  <p className="font-jost text-[0.62rem] font-semibold tracking-widest uppercase text-gold mb-1">{d.label}</p>
                  <p className="font-jost text-[0.86rem] text-ivory/65 leading-relaxed">{d.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="flex gap-3 flex-wrap pt-3">
              <a href="https://wa.me/919545453720" target="_blank" rel="noopener noreferrer" className="btn-primary py-3 px-6 text-[0.65rem]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="https://www.google.com/maps/search/501+City+Center+opposite+Vaibhav+Complex+Hadapsar+Pune+Maharashtra+411028" target="_blank" rel="noopener noreferrer" className="btn-outline py-3 px-6 text-[0.65rem]">
                Get Directions
              </a>
            </motion.div>
          </motion.div>

          {/* Map column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3">
            {/* Map wrapper with corner ornaments */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
                <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'linear-gradient(to left, #C9A84C, transparent)' }} />
                <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: 'linear-gradient(to top, #C9A84C, transparent)' }} />
              </div>

              <div className="rounded-2xl overflow-hidden border border-gold/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] h-[420px]">
                <iframe
                  title="Arogya Mantra Clinic Location"
                  src="https://www.google.com/maps?q=501+City+Center+opposite+Vaibhav+Complex+Hadapsar+Pune+Maharashtra+411028&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) saturate(0.6) brightness(0.85)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Hours badge below map */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sage animate-pulse-dot" />
                <span className="font-jost text-[0.72rem] text-ivory/60 tracking-wider">Open Today</span>
                <span className="font-jost text-[0.72rem] text-gold font-semibold">5:30 PM – 8:00 PM</span>
              </div>
              <span className="font-jost text-[0.68rem] text-warmgrey/50 tracking-wide">Mon – Sat only</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
