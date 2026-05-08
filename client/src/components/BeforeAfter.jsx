import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAdminImage } from '../context/ImageContext'

const CASES = [
  {
    id: 'ba1',
    label: 'Skin Treatment',
    condition: 'Pigmentation & Pimples',
    duration: '8 Weeks',
    beforeKey: 'before_skin',
    afterKey: 'after_skin',
    beforeFallback: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
    afterFallback: 'https://images.unsplash.com/photo-1613323593608-abc90fec84ff?w=500&q=80',
  },
  {
    id: 'ba2',
    label: 'Hair Treatment',
    condition: 'Hair Loss & Thinning',
    duration: '12 Weeks',
    beforeKey: 'before_hair',
    afterKey: 'after_hair',
    beforeFallback: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80',
    afterFallback: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&q=80',
  },
]

function CaseSlider({ c }) {
  const before = useAdminImage(c.beforeKey, c.beforeFallback)
  const after = useAdminImage(c.afterKey, c.afterFallback)
  return <Slider before={before} after={after} />
}

function Slider({ before, after }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPos(x)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl cursor-col-resize select-none"
      style={{ aspectRatio: '4/3' }}
      onMouseDown={e => { dragging.current = true; updatePos(e.clientX) }}
      onMouseMove={e => { if (dragging.current) updatePos(e.clientX) }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={e => updatePos(e.touches[0].clientX)}
      onTouchStart={e => updatePos(e.touches[0].clientX)}>

      {/* After (base) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="w-full h-full object-cover" style={{ minWidth: `${100 * 100 / pos}%` }} />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-10"
        style={{ left: `${pos}%`, background: '#C9A84C', boxShadow: '0 0 10px rgba(201,168,76,0.6)' }}>
        {/* Handle */}
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#C9A84C', left: '50%' }}>
          <span className="text-ink font-bold text-[0.65rem] tracking-wider select-none">⟷</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 font-jost text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
        style={{ background: 'rgba(13,8,7,0.8)', color: 'rgba(154,143,133,0.9)', backdropFilter: 'blur(4px)' }}>
        BEFORE
      </div>
      <div className="absolute top-4 right-4 font-jost text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
        style={{ background: 'rgba(13,8,7,0.8)', color: '#C9A84C', backdropFilter: 'blur(4px)' }}>
        AFTER
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #1A100C, #0D0807)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,26,26,0.07) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <p className="section-label mb-3">Results Speak</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)] mt-3">
            <em className="text-gradient-gold not-italic">Visible</em> Transformations
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey mt-3 max-w-md mx-auto leading-relaxed">
            Drag the slider to see the difference Ayurveda makes
          </p>
          <p className="font-jost text-[0.65rem] text-warmgrey/40 tracking-widest uppercase mt-2">
            Patient images will be placed here — coming soon
          </p>
        </motion.div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}>
              <CaseSlider c={c} />

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-playfair text-[1.05rem] text-ivory font-medium">{c.label}</h3>
                  <p className="font-jost text-[0.75rem] text-warmgrey mt-1">{c.condition}</p>
                </div>
                <div className="text-right">
                  <span className="font-jost text-[0.6rem] font-semibold tracking-widest uppercase text-gold/70">Duration</span>
                  <p className="font-playfair text-gold text-lg font-medium">{c.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 font-jost text-[0.65rem] text-warmgrey/35 leading-relaxed max-w-xl mx-auto">
          * Individual results may vary. Photographs shown are illustrative. Actual patient before/after images will be added with consent.
        </motion.p>
      </div>
    </section>
  )
}
