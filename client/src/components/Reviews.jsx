import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { REVIEWS } from '../data'

function StarRow({ count = 5 }) {
  return (
    <span className="text-gold tracking-[0.05em] text-sm">
      {'★'.repeat(count)}
    </span>
  )
}

const platformColors = {
  Google: '#4285F4',
  Practo: '#2ECC71',
  Justdial: '#FF6900',
}

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="relative section-pad overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0D0807 0%, #1A100C 50%, #0D0807 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 10%, rgba(139,26,26,0.07) 0%, transparent 60%)' }} />

      {/* Top curve */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 0 L0 0Z" fill="#1A100C" />
        </svg>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8">
          <p className="section-label mb-3">Patient Stories</p>
          <div className="gold-line-center" />

          {/* Rating badge */}
          <div className="inline-flex items-center gap-4 rounded-full px-7 py-3 mt-4 mb-4"
            style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
            <span className="text-gold text-lg tracking-widest">★★★★★</span>
            <div className="h-5 w-px" style={{ background: 'rgba(201,168,76,0.25)' }} />
            <div>
              <span className="font-playfair text-gold text-xl">4.8</span>
              <span className="font-jost text-[0.65rem] text-warmgrey ml-2">/ 42+ Reviews</span>
            </div>
          </div>

          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)]">
            Real <em className="text-gradient-gold not-italic">Transformations</em>
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey mt-2">Lives changed through the wisdom of Ayurveda</p>
        </motion.div>

        {/* Scroll controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-all duration-300">
            ←
          </button>
          <button onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-all duration-300">
            →
          </button>
        </div>

        {/* Scrollable reviews */}
        <div ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="flex-shrink-0 snap-start rounded-[1.5rem] p-7 transition-all duration-400 group"
              style={{
                width: '320px',
                background: 'linear-gradient(135deg, #1A100C 0%, #231410 100%)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(201,168,76,0.3)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}>

              {/* Platform badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center font-playfair text-lg text-white font-semibold flex-shrink-0 shadow-lg`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-jost text-[0.9rem] font-medium text-ivory">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-jost text-[0.58rem] font-bold uppercase tracking-wider"
                        style={{ color: platformColors[r.platform] || '#C9A84C' }}>
                        {r.platform}
                      </span>
                      <span className="text-warmgrey/40 text-[0.55rem]">·</span>
                      <span className="font-jost text-[0.6rem] text-warmgrey">{r.condition}</span>
                    </div>
                  </div>
                </div>
                <StarRow />
              </div>

              {/* Quote mark */}
              <div className="font-playfair text-5xl text-crimson/25 leading-none mb-1 -mt-2">"</div>

              {/* Review text */}
              <p className="font-cormorant text-[1.05rem] italic text-ivory/75 leading-[1.75]">
                {r.text}
              </p>

              {/* Condition */}
              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                <span className="font-jost text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-sage-light"
                  style={{ color: 'rgba(107,149,96,0.8)' }}>
                  {r.condition}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 flex flex-wrap gap-4 justify-center items-center">

          <a href="https://share.google/mpQKQsSvQGOg9koAq"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.3)', color: '#7EB3F7' }}>
            {/* Google G icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88Z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.58-2c-.72.48-1.63.76-2.72.76-2.1 0-3.87-1.41-4.5-3.31H.84v2.06A8 8 0 0 0 8 16Z" fill="#34A853"/>
              <path d="M3.5 9.51A4.8 4.8 0 0 1 3.25 8c0-.53.09-1.04.25-1.51V4.43H.84A8 8 0 0 0 0 8c0 1.29.31 2.5.84 3.57l2.66-2.06Z" fill="#FBBC05"/>
              <path d="M8 3.18c1.18 0 2.24.41 3.07 1.2l2.3-2.3A8 8 0 0 0 .84 4.43L3.5 6.49C4.13 4.59 5.9 3.18 8 3.18Z" fill="#EA4335"/>
            </svg>
            <span className="font-jost text-[0.72rem] font-semibold tracking-wider uppercase">Read Google Reviews</span>
          </a>

          <a href="https://www.justdial.com" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex text-[0.72rem]">
            View All Reviews
          </a>
        </motion.div>
      </div>
    </section>
  )
}
