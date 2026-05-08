import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const CATS = ['All', 'Clinic', 'Treatments', 'Herbs & Botanicals', 'Wellness']

const ITEMS = [
  {
    id: 1, cat: 'Herbs & Botanicals',
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=85',
    title: 'Ancient Healing Herbs', sub: 'Nature\'s pharmacy in its purest form',
    size: 'large',
  },
  {
    id: 2, cat: 'Wellness',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
    title: 'Path to Harmony', sub: 'Where healing begins',
    size: 'tall',
  },
  {
    id: 3, cat: 'Herbs & Botanicals',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=85',
    title: 'Sacred Spices', sub: 'Turmeric, ashwagandha & more',
    size: 'normal',
  },
  {
    id: 4, cat: 'Treatments',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=85',
    title: 'Yoga & Ayurveda', sub: 'Union of body, mind and spirit',
    size: 'wide',
  },
  {
    id: 5, cat: 'Clinic',
    img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=85',
    title: 'Healing Sanctuary', sub: 'Our serene clinic environment',
    size: 'normal',
  },
  {
    id: 6, cat: 'Herbs & Botanicals',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    title: 'Green Remedies', sub: 'Direct from nature\'s lap',
    size: 'normal',
  },
  {
    id: 7, cat: 'Wellness',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    title: 'Herbal Infusions', sub: 'Crafted with ancient wisdom',
    size: 'tall',
  },
  {
    id: 8, cat: 'Treatments',
    img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=85',
    title: 'Therapeutic Ritual', sub: 'Restoring inner balance',
    size: 'large',
  },
  {
    id: 9, cat: 'Clinic',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=85',
    title: 'Sacred Space', sub: 'Where wellness is born',
    size: 'normal',
  },
  {
    id: 10, cat: 'Herbs & Botanicals',
    img: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=900&q=85',
    title: 'Spice Heritage', sub: 'India\'s golden legacy',
    size: 'wide',
  },
  {
    id: 11, cat: 'Wellness',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85',
    title: 'Natural Serenity', sub: 'Reconnect with the earth',
    size: 'normal',
  },
  {
    id: 12, cat: 'Treatments',
    img: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=900&q=85',
    title: 'Lotus Awakening', sub: 'Purity, beauty, wholeness',
    size: 'normal',
  },
]

function GalleryCard({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        item.size === 'large' ? 'sm:col-span-2 sm:row-span-2' :
        item.size === 'wide' ? 'sm:col-span-2' :
        item.size === 'tall' ? 'sm:row-span-2' : ''
      }`}
      style={{
        minHeight: item.size === 'tall' || item.size === 'large' ? '380px' : '240px',
      }}>
      {/* Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(13,8,7,0.95) 0%, rgba(13,8,7,0.3) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0.7,
        }} />

      {/* Gold border reveal */}
      <div
        className="absolute inset-0 rounded-2xl border-2 transition-opacity duration-500"
        style={{ borderColor: 'rgba(201,168,76,0.4)', opacity: hovered ? 1 : 0 }} />

      {/* Category chip */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full"
        style={{ background: 'rgba(139,26,26,0.8)', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(8px)' }}>
        <span className="font-jost text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-gold/90">{item.cat}</span>
      </div>

      {/* Zoom icon */}
      <motion.div
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', backdropFilter: 'blur(8px)' }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.25 }}>
        <ZoomIn size={14} className="text-gold" />
      </motion.div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.p
          className="font-jost text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-gold/70 mb-1.5"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}>
          {item.sub}
        </motion.p>
        <h3 className="font-playfair text-ivory leading-tight"
          style={{ fontSize: item.size === 'large' ? 'clamp(1.3rem, 2.5vw, 1.8rem)' : 'clamp(1rem, 2vw, 1.25rem)' }}>
          {item.title}
        </h3>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, items, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const idx = items.findIndex(i => i.id === item.id)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(8,4,3,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:bg-white/10"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        <X size={18} className="text-ivory/80" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-6 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:bg-white/10"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        <ChevronLeft size={20} className="text-ivory/80" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-6 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:bg-white/10"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        <ChevronRight size={20} className="text-ivory/80" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full mx-16 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
          <img
            src={item.img}
            alt={item.title}
            className="w-full max-h-[75vh] object-cover"
          />
          <div className="px-6 py-4" style={{ background: 'rgba(13,8,7,0.97)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-ivory text-xl">{item.title}</h3>
                <p className="font-cormorant italic text-ivory/50 text-sm mt-0.5">{item.sub}</p>
              </div>
              <span className="font-jost text-[0.6rem] tracking-[0.25em] uppercase text-gold/60">
                {idx + 1} / {items.length}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = activeCat === 'All' ? ITEMS : ITEMS.filter(i => i.cat === activeCat)

  const handlePrev = useCallback(() => {
    if (!lightboxItem) return
    const idx = filtered.findIndex(i => i.id === lightboxItem.id)
    setLightboxItem(filtered[(idx - 1 + filtered.length) % filtered.length])
  }, [lightboxItem, filtered])

  const handleNext = useCallback(() => {
    if (!lightboxItem) return
    const idx = filtered.findIndex(i => i.id === lightboxItem.id)
    setLightboxItem(filtered[(idx + 1) % filtered.length])
  }, [lightboxItem, filtered])

  return (
    <>
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={() => setLightboxItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #0D0807, #140A08)' }}>

        {/* Hero Banner */}
        <div className="relative pt-28 pb-16 overflow-hidden">
          {/* Background radial */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,26,26,0.15) 0%, transparent 70%)' }} />

          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.1), transparent)' }} />

          <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-label mb-4">
              Visual Journey
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="gold-line-center" />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[1.05] mt-4 mb-6">
              <span className="text-gradient-gold">Glimpses</span>
              <br />
              <span className="text-ivory/90 font-light">of Healing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-cormorant text-[clamp(1rem,2vw,1.3rem)] italic text-ivory/50 max-w-md mx-auto">
              A window into our world of Ayurvedic healing, sacred herbs, and ancient wisdom
            </motion.p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-[1200px] mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 justify-center">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="relative px-5 py-2.5 font-jost text-[0.65rem] font-semibold tracking-[0.18em] uppercase transition-all duration-400 rounded-full"
                style={{
                  color: activeCat === cat ? '#0D0807' : 'rgba(245,236,215,0.55)',
                  background: activeCat === cat ? '#C9A84C' : 'rgba(201,168,76,0.06)',
                  border: `1px solid ${activeCat === cat ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                  boxShadow: activeCat === cat ? '0 4px 20px rgba(201,168,76,0.3)' : 'none',
                }}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gridAutoRows: 'minmax(220px, auto)' }}>
              {filtered.map((item, i) => (
                <GalleryCard key={item.id} item={item} index={i} onClick={setLightboxItem} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA section */}
        <div className="border-t py-20 text-center relative"
          style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'linear-gradient(to bottom, transparent, rgba(139,26,26,0.04))' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <p className="font-cormorant text-[clamp(1.3rem,2.5vw,1.8rem)] italic text-ivory/60 mb-2">
              Ready to begin your healing journey?
            </p>
            <h2 className="font-playfair text-[clamp(2rem,4vw,3rem)] text-ivory mb-8">
              Book a <em className="text-gradient-gold not-italic">Consultation</em>
            </h2>
            <a href="/book" className="btn-primary inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Schedule Your Visit
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}
