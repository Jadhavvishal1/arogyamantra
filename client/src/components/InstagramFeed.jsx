import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const PLACEHOLDERS = [
  { id: 'p1', bg: 'from-crimson/30 to-ink2', icon: '💧', label: 'Shirodhara' },
  { id: 'p2', bg: 'from-sage/25 to-ink2', icon: '🧘', label: 'Yoga Batch' },
  { id: 'p3', bg: 'from-gold/15 to-ink2', icon: '🌿', label: 'Our Products' },
  { id: 'p4', bg: 'from-crimson/20 to-sage/15', icon: '🔥', label: 'Panchakarma' },
  { id: 'p5', bg: 'from-gold/20 to-crimson/15', icon: '✦', label: 'Skinergy' },
  { id: 'p6', bg: 'from-sage/20 to-gold/10', icon: '🏥', label: 'Clinic Life' },
]

function getYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/)
  return m ? m[1] : null
}

function getInstagramId(url) {
  const m = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?]+)/)
  return m ? m[1] : null
}

function ReelCard({ reel, index }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const isUpload = reel.type === 'upload'
  const ytId = !isUpload ? getYouTubeId(reel.url) : null
  const igId = !isUpload && !ytId ? getInstagramId(reel.url) : null

  const handleClick = () => {
    if (isUpload) {
      setPlaying(p => !p)
      if (!playing) videoRef.current?.play()
      else videoRef.current?.pause()
    } else if (ytId) {
      setPlaying(true)
    } else {
      window.open(reel.url, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleClick}
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: '1px solid rgba(201,168,76,0.1)' }}>

      {/* Content */}
      {isUpload ? (
        <>
          {reel.thumbnail ? (
            <img src={`${API}${reel.thumbnail}`} alt={reel.caption} className="w-full h-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              src={`${API}${reel.url}`}
              className="w-full h-full object-cover"
              loop muted playsInline
              poster=""
            />
          )}
          {/* Play button */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(13,8,7,0.35)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: 'rgba(139,26,26,0.85)', border: '1px solid rgba(201,168,76,0.4)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#C9A84C">
                  <path d="M5 3l9 5-9 5V3z" />
                </svg>
              </div>
            </div>
          )}
        </>
      ) : ytId && playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : ytId ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt={reel.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(13,8,7,0.35)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: 'rgba(255,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M5 3l9 5-9 5V3z" />
              </svg>
            </div>
          </div>
        </>
      ) : igId ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(240,148,51,0.2), rgba(188,24,136,0.2))' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
          </svg>
          <p className="font-jost text-[0.6rem] text-white/60 text-center px-3 leading-relaxed">{reel.caption || 'Instagram Post'}</p>
          <p className="font-jost text-[0.55rem] text-white/40 tracking-wider uppercase">Tap to view</p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2"
          style={{ background: 'rgba(26,16,12,0.9)' }}>
          <span className="text-3xl">🎬</span>
          <p className="font-jost text-[0.6rem] text-warmgrey/60 text-center px-3">{reel.caption || 'Video'}</p>
        </div>
      )}

      {/* Caption overlay */}
      {reel.caption && !playing && (
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.9), transparent)' }}>
          <p className="font-cormorant text-[0.82rem] italic text-ivory/80 text-center">{reel.caption}</p>
        </div>
      )}

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,0.4)' }} />
    </motion.div>
  )
}

function PlaceholderCard({ p, index }) {
  return (
    <motion.a
      href="https://www.instagram.com/arogyamantraclinic/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${p.bg}`}
      style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="text-2xl">{p.icon}</span>
        <p className="font-jost text-[0.6rem] font-semibold tracking-widest uppercase text-ivory/60 text-center px-2">{p.label}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(13,8,7,0.65)', backdropFilter: 'blur(2px)' }}>
        <p className="font-jost text-[0.58rem] text-gold/60 tracking-wider uppercase">View on Instagram</p>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,0.4)' }} />
    </motion.a>
  )
}

export default function InstagramFeed() {
  const [reels, setReels] = useState([])

  useEffect(() => {
    fetch(`${API}/api/reels`)
      .then(r => r.json())
      .then(setReels)
      .catch(() => {})
  }, [])

  const displayItems = reels.length > 0 ? reels.slice(0, 6) : null

  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#0D0807' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="font-jost text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-ivory/60">
              @arogyamantraclinic
            </span>
          </div>
          <p className="section-label mb-3">Follow Our Journey</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)] mt-3">
            Life at <em className="text-gradient-gold not-italic">Arogya Mantra</em>
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey mt-3">
            Daily healing, wellness tips, and patient journeys
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {displayItems
            ? displayItems.map((reel, i) => <ReelCard key={reel._id} reel={reel} index={i} />)
            : PLACEHOLDERS.map((p, i) => <PlaceholderCard key={p.id} p={p} index={i} />)
          }
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center">
          <a href="https://www.instagram.com/arogyamantraclinic/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, rgba(240,148,51,0.15) 0%, rgba(188,24,136,0.15) 100%)', border: '1px solid rgba(240,148,51,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#ig-g2)" strokeWidth="1.8">
              <defs>
                <linearGradient id="ig-g2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f09433" /><stop offset="50%" stopColor="#dc2743" /><stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-g2)" stroke="none" />
            </svg>
            <span className="font-jost text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-ivory/80">
              Follow @arogyamantraclinic
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
