import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const galleryItems = [
  {
    id: 'g1',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85',
    caption: 'Panchakarma Healing',
    category: 'Panchakarma',
  },
  {
    id: 'g2',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85',
    caption: 'Yoga Therapy Session',
    category: 'Yoga',
  },
  {
    id: 'g3',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=85',
    caption: 'Sacred Herb Rituals',
    category: 'Panchakarma',
  },
  {
    id: 'g4',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    caption: 'Skinergy — Soundarya Mantra',
    category: 'Skin Care',
  },
  {
    id: 'g5',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&q=85',
    caption: 'Ayurvedic Herb Preparation',
    category: 'Products',
  },
  {
    id: 'g6',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=85',
    caption: 'Our Healing Sanctuary',
    category: 'Clinic',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#0D0807' }} />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <p className="section-label mb-3">Inside Arogya Mantra</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)] mt-3">
            A Glimpse of <em className="text-gradient-gold not-italic">Our Sanctuary</em>
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey mt-3 max-w-md mx-auto">
            Where healing begins the moment you enter
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative cursor-pointer rounded-[1.2rem] overflow-hidden ${
                i === 0 ? 'md:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '1 / 1.8' : '4 / 3' }}
              onClick={() => setLightbox(item)}>

              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ transform: 'scale(1.01)' }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 transition-all duration-400"
                style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.85) 0%, rgba(13,8,7,0.2) 50%, rgba(13,8,7,0.1) 100%)' }} />

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(139,26,26,0.15)' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.9)', backdropFilter: 'blur(4px)' }}>
                  <ZoomIn size={16} className="text-ink" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-jost text-[0.55rem] font-semibold tracking-widest uppercase text-gold/70 mb-1 block">{item.category}</span>
                <p className="font-playfair text-sm text-ivory/90">{item.caption}</p>
              </div>

              {/* Border */}
              <div className="absolute inset-0 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(201,168,76,0.25)' }} />
            </motion.div>
          ))}
        </div>

        {/* Add photos note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 font-jost text-[0.7rem] text-warmgrey/40 tracking-widest uppercase">
          Real clinic photos will be added here • Contact us to update gallery
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setLightbox(null)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <img src={lightbox.image} alt={lightbox.caption} className="w-full object-cover rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.9), transparent)' }}>
                <span className="font-jost text-[0.6rem] font-semibold tracking-widest uppercase text-gold/70">{lightbox.category}</span>
                <p className="font-playfair text-lg text-ivory mt-1">{lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <X size={15} className="text-ivory" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
