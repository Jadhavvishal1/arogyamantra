import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const ADMIN_KEY = 'arogyamantra2025'

const SECTIONS = [
  {
    id: 'brand',
    label: 'Logo & Brand',
    icon: '🌿',
    slots: [
      { key: 'logo_main', label: 'Clinic Logo', hint: 'PNG with transparent background recommended (200×200 or square)' },
    ],
  },
  {
    id: 'hero',
    label: 'Hero Banner',
    icon: '🏠',
    slots: [
      { key: 'hero_main', label: 'Hero Background Image', hint: 'Full-width banner (1800×900 recommended)' },
    ],
  },
  {
    id: 'about',
    label: 'Our Story / Doctor',
    icon: '👩‍⚕️',
    slots: [
      { key: 'about_doctor', label: "Doctor's Portrait (Our Story section)", hint: 'Vrushali Maisekar photo (600×700 recommended)' },
      { key: 'about_banner', label: 'Our Story — Page Banner', hint: 'Background banner at top of About page (1600×600)' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: '🛍️',
    slots: [
      { key: 'product_p1', label: 'Hair Oil', hint: '600×600' },
      { key: 'product_p2', label: 'Abhyanga Tel', hint: '600×600' },
      { key: 'product_p3', label: 'Shekekai Shampoo', hint: '600×600' },
      { key: 'product_p9', label: 'Anti-Dandruff Shampoo', hint: '600×600' },
      { key: 'product_p4', label: 'Ubtan', hint: '600×600' },
      { key: 'product_p7', label: 'Ayurvedic Soap', hint: '600×600' },
      { key: 'product_p5', label: 'Bath Blend', hint: '600×600' },
      { key: 'product_p10', label: 'Hair Colour', hint: '600×600' },
      { key: 'product_p6', label: 'Murabba (Amla)', hint: '600×600' },
      { key: 'product_p8', label: 'Chyawan Prash', hint: '600×600' },
    ],
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: '🖼️',
    slots: [
      { key: 'gallery_1', label: 'Gallery Photo 1', hint: '800×600' },
      { key: 'gallery_2', label: 'Gallery Photo 2', hint: '800×600' },
      { key: 'gallery_3', label: 'Gallery Photo 3', hint: '800×600' },
      { key: 'gallery_4', label: 'Gallery Photo 4', hint: '800×600' },
      { key: 'gallery_5', label: 'Gallery Photo 5', hint: '800×600' },
      { key: 'gallery_6', label: 'Gallery Photo 6', hint: '800×600' },
    ],
  },
  {
    id: 'beforeafter',
    label: 'Before / After',
    icon: '✨',
    slots: [
      { key: 'before_skin', label: 'Skin — Before', hint: '600×400' },
      { key: 'after_skin', label: 'Skin — After', hint: '600×400' },
      { key: 'before_hair', label: 'Hair — Before', hint: '600×400' },
      { key: 'after_hair', label: 'Hair — After', hint: '600×400' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: '🌿',
    slots: [
      { key: 'service_s1', label: 'Panchabhoutik Chikitsa', hint: '800×500' },
      { key: 'service_s2', label: 'Yoga Therapy', hint: '800×500' },
      { key: 'service_s3', label: 'Panchakarma', hint: '800×500' },
      { key: 'service_s4', label: 'Skinergy', hint: '800×500' },
      { key: 'service_s5', label: 'Hair Regain Clinic', hint: '800×500' },
      { key: 'service_s6', label: "Women's Health", hint: '800×500' },
    ],
  },
]

function UploadSlot({ slot, currentUrl, adminKey, onUploaded, onDeleted }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [drag, setDrag] = useState(false)
  const [err, setErr] = useState(null)

  const upload = async (file) => {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    setErr(null)
    try {
      const fd = new FormData()
      fd.append('section', slot.key.split('_')[0])
      fd.append('key', slot.key)
      fd.append('altText', slot.label)
      fd.append('image', file)
      const res = await fetch(`${API}/api/admin/images`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: fd,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onUploaded(slot.key, `${API}${data.url}`)
    } catch (e) {
      setErr(e.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!currentUrl) return
    try {
      await fetch(`${API}/api/admin/images/${slot.key}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })
      setPreview(null)
      onDeleted(slot.key)
    } catch (e) {
      setErr(e.message)
    }
  }

  const displayUrl = preview || currentUrl

  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${drag ? 'border-gold scale-[1.01]' : 'border-gold/20'}`}
      style={{ background: '#0D0807' }}
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files[0]) }}>

      {/* Image preview */}
      <div className="aspect-video relative bg-ink2">
        {displayUrl ? (
          <>
            <img src={displayUrl} alt={slot.label} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => fileRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-[0.68rem] font-semibold font-jost text-white transition-colors"
                style={{ background: 'rgba(139,26,26,0.9)' }}>
                Replace
              </button>
              <button onClick={handleDelete}
                className="px-3 py-1.5 rounded-lg text-[0.68rem] font-semibold font-jost text-white"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                Remove
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => fileRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-warmgrey/40 hover:text-gold/60 transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="10" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 22l7-6 5 5 4-4 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2v10M17 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-jost text-[0.68rem] tracking-wide">Drop image or click to upload</span>
            <span className="font-jost text-[0.58rem] opacity-60">{slot.hint}</span>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(13,8,7,0.85)' }}>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
              <span className="font-jost text-xs text-gold/70">Uploading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div>
          <p className="font-jost text-[0.72rem] font-semibold text-ivory/80">{slot.label}</p>
          {err && <p className="font-jost text-[0.6rem] text-red-400 mt-0.5">{err}</p>}
        </div>
        {!displayUrl && (
          <button onClick={() => fileRef.current?.click()}
            className="text-[0.62rem] font-jost font-semibold px-2.5 py-1 rounded transition-colors"
            style={{ background: 'rgba(201,168,76,0.1)', color: 'rgba(201,168,76,0.8)' }}>
            Upload
          </button>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={e => upload(e.target.files[0])} />
    </div>
  )
}

function ReelsManager({ adminKey }) {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('url') // 'url' | 'upload'
  const [urlInput, setUrlInput] = useState('')
  const [caption, setCaption] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [thumbFile, setThumbFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const videoRef = useRef(null)
  const thumbRef = useRef(null)

  const load = async () => {
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/reels`)
      setReels(await r.json())
    } catch { }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addUrl = async () => {
    if (!urlInput.trim()) return setErr('Please enter a URL')
    setSaving(true); setErr('')
    try {
      const r = await fetch(`${API}/api/reels/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ url: urlInput.trim(), caption }),
      })
      if (!r.ok) throw new Error(await r.text())
      setUrlInput(''); setCaption('')
      await load()
    } catch (e) { setErr(e.message) }
    setSaving(false)
  }

  const addUpload = async () => {
    if (!videoFile) return setErr('Please select a video file')
    setSaving(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('video', videoFile)
      if (thumbFile) fd.append('thumbnail', thumbFile)
      fd.append('caption', caption)
      const r = await fetch(`${API}/api/reels/upload`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: fd,
      })
      if (!r.ok) throw new Error(await r.text())
      setVideoFile(null); setThumbFile(null); setCaption('')
      if (videoRef.current) videoRef.current.value = ''
      if (thumbRef.current) thumbRef.current.value = ''
      await load()
    } catch (e) { setErr(e.message) }
    setSaving(false)
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this reel?')) return
    await fetch(`${API}/api/reels/${id}`, { method: 'DELETE', headers: { 'x-admin-key': adminKey } })
    await load()
  }

  const getEmbedType = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
    if (url.includes('instagram.com')) return 'instagram'
    return 'direct'
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🎬</span>
        <div>
          <h2 className="font-playfair text-xl text-ivory">Reels & Videos</h2>
          <p className="font-jost text-[0.65rem] text-warmgrey/50 mt-0.5">{reels.length} video{reels.length !== 1 ? 's' : ''} · shown in "Life at Arogya Mantra" section</p>
        </div>
      </div>

      {/* Add form */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: '#1A100C', border: '1px solid rgba(201,168,76,0.12)' }}>
        <p className="font-jost text-[0.65rem] font-semibold tracking-widest uppercase text-gold/60 mb-4">Add New Video</p>

        {/* Tab toggle */}
        <div className="flex gap-2 mb-5">
          {[['url', '🔗 Paste URL'], ['upload', '📁 Upload File']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="font-jost text-[0.68rem] font-semibold px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: tab === key ? 'rgba(139,26,26,0.9)' : 'rgba(201,168,76,0.06)',
                color: tab === key ? 'white' : 'rgba(201,168,76,0.7)',
                border: `1px solid ${tab === key ? 'rgba(139,26,26,0.8)' : 'rgba(201,168,76,0.15)'}`,
              }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'url' ? (
          <div className="space-y-3">
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/50 block mb-1.5">Instagram / YouTube URL</label>
              <input
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://www.instagram.com/reel/... or https://youtu.be/..."
                className="form-input text-[0.8rem]"
              />
              <p className="font-jost text-[0.58rem] text-warmgrey/40 mt-1">Paste any Instagram post/reel URL or YouTube link</p>
            </div>
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/50 block mb-1.5">Caption (optional)</label>
              <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Shirodhara treatment" className="form-input text-[0.8rem]" />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/50 block mb-1.5">Video File (MP4, MOV, WebM — max 100MB)</label>
              <input ref={videoRef} type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])}
                className="font-jost text-[0.75rem] text-warmgrey/70 block w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[0.65rem] file:font-semibold file:bg-crimson/20 file:text-crimson cursor-pointer" />
            </div>
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/50 block mb-1.5">Thumbnail Image (optional)</label>
              <input ref={thumbRef} type="file" accept="image/*" onChange={e => setThumbFile(e.target.files[0])}
                className="font-jost text-[0.75rem] text-warmgrey/70 block w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[0.65rem] file:font-semibold file:bg-gold/10 file:text-gold cursor-pointer" />
            </div>
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/50 block mb-1.5">Caption (optional)</label>
              <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Panchakarma session" className="form-input text-[0.8rem]" />
            </div>
          </div>
        )}

        {err && <p className="font-jost text-[0.65rem] text-red-400 mt-3">{err}</p>}

        <button
          onClick={tab === 'url' ? addUrl : addUpload}
          disabled={saving}
          className="mt-4 btn-primary py-2.5 px-6 text-[0.68rem] disabled:opacity-50">
          {saving ? 'Adding...' : '+ Add Video'}
        </button>
      </div>

      {/* Existing reels */}
      {loading ? (
        <div className="flex justify-center py-10"><div className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin" /></div>
      ) : reels.length === 0 ? (
        <div className="text-center py-14 rounded-2xl" style={{ border: '1px dashed rgba(201,168,76,0.15)' }}>
          <p className="font-cormorant text-xl italic text-warmgrey/40">No videos added yet</p>
          <p className="font-jost text-[0.65rem] text-warmgrey/30 mt-2">Add your first video above</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/40 mb-3">Uploaded Videos ({reels.length})</p>
          {reels.map((reel) => {
            const type = reel.type === 'upload' ? 'upload' : getEmbedType(reel.url)
            return (
              <div key={reel._id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.1)' }}>
                {/* Preview thumbnail */}
                <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ background: '#0D0807', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {reel.thumbnail ? (
                    <img src={`${API}${reel.thumbnail}`} alt="" className="w-full h-full object-cover" />
                  ) : reel.type === 'upload' ? (
                    <video src={`${API}${reel.url}`} className="w-full h-full object-cover" muted />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{type === 'youtube' ? '▶️' : type === 'instagram' ? '📸' : '🎬'}</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-jost text-[0.72rem] font-semibold text-ivory/80 truncate">
                    {reel.caption || (reel.type === 'upload' ? 'Uploaded video' : reel.url)}
                  </p>
                  <p className="font-jost text-[0.58rem] text-warmgrey/40 mt-0.5 truncate">
                    {reel.type === 'upload' ? '📁 Uploaded file' : `🔗 ${type === 'youtube' ? 'YouTube' : type === 'instagram' ? 'Instagram' : 'Direct URL'}`}
                  </p>
                </div>
                {/* Delete */}
                <button onClick={() => remove(reel._id)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-crimson/20"
                  style={{ border: '1px solid rgba(139,26,26,0.3)', color: 'rgba(139,26,26,0.7)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [keyErr, setKeyErr] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(false)

  const login = () => {
    if (keyInput === ADMIN_KEY) { setAuthed(true); loadImages() }
    else { setKeyErr(true); setTimeout(() => setKeyErr(false), 1500) }
  }

  const loadImages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/admin/images`)
      const data = await res.json()
      const flat = {}
      Object.values(data).flat().forEach(img => { flat[img.key] = img.url })
      setImages(flat)
    } catch { }
    setLoading(false)
  }

  const handleUploaded = (key, url) => setImages(p => ({ ...p, [key]: url }))
  const handleDeleted = (key) => setImages(p => { const n = { ...p }; delete n[key]; return n })

  const section = SECTIONS.find(s => s.id === activeSection)

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #0D0807 0%, #1A100C 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[380px] rounded-3xl p-8"
          style={{ background: '#1A100C', border: '1px solid rgba(201,168,76,0.2)' }}>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'radial-gradient(circle at 35% 35%, #A52020, #6B1010)', boxShadow: '0 0 30px rgba(139,26,26,0.4)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 24 C12 20 5 16 6 10 C7 7 9 6 11.5 7 C12.5 7.5 13.2 8.5 14 9.5 C14.8 8.5 15.5 7.5 16.5 7 C19 6 21 7 22 10 C23 16 16 20 14 24Z" fill="#C9A84C" opacity="0.9"/>
              </svg>
            </div>
            <h1 className="font-playfair text-2xl text-ivory mb-1">Admin Panel</h1>
            <p className="font-jost text-[0.72rem] text-warmgrey/60 tracking-wider">Arogya Mantra — Image Management</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-jost text-[0.6rem] tracking-widest uppercase text-warmgrey/60 block mb-2">Admin Key</label>
              <motion.input
                animate={keyErr ? { x: [-8, 8, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="password"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="Enter admin key..."
                className="form-input"
                style={{ borderColor: keyErr ? 'rgba(139,26,26,0.8)' : undefined }}
              />
              {keyErr && <p className="font-jost text-[0.62rem] text-red-400 mt-1">Incorrect key</p>}
            </div>
            <button onClick={login} className="btn-primary w-full justify-center py-3.5">
              Enter Dashboard →
            </button>
          </div>

          <p className="text-center font-jost text-[0.58rem] text-warmgrey/30 mt-6">
            Default key: arogyamantra2025
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0807' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(13,8,7,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'radial-gradient(circle, #A52020, #6B1010)' }}>
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
              <path d="M14 24 C12 20 5 16 6 10 C7 7 9 6 11.5 7 C12.5 7.5 13.2 8.5 14 9.5 C14.8 8.5 15.5 7.5 16.5 7 C19 6 21 7 22 10 C23 16 16 20 14 24Z" fill="#C9A84C"/>
            </svg>
          </div>
          <div>
            <h1 className="font-playfair text-[1rem] text-ivory leading-none">Admin Dashboard</h1>
            <p className="font-jost text-[0.55rem] text-warmgrey/50 tracking-wider mt-0.5">Image Management · Arogya Mantra</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="font-jost text-[0.65rem] text-warmgrey/60 hover:text-gold transition-colors">← View Site</a>
          <button onClick={() => setAuthed(false)}
            className="font-jost text-[0.65rem] px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(139,26,26,0.15)', color: 'rgba(139,26,26,0.8)', border: '1px solid rgba(139,26,26,0.3)' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 p-4 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(201,168,76,0.08)' }}>
          <p className="font-jost text-[0.55rem] tracking-[0.25em] uppercase text-warmgrey/40 mb-3 px-2">Sections</p>
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-200"
                style={{
                  background: activeSection === s.id ? 'rgba(201,168,76,0.08)' : 'transparent',
                  borderLeft: activeSection === s.id ? '2px solid rgba(201,168,76,0.6)' : '2px solid transparent',
                }}>
                <span className="text-base">{s.icon}</span>
                <span className={`font-jost text-[0.75rem] font-medium transition-colors ${activeSection === s.id ? 'text-gold' : 'text-warmgrey/70'}`}>
                  {s.label}
                </span>
                <span className="ml-auto font-jost text-[0.55rem] text-warmgrey/30">
                  {s.slots.filter(sl => images[sl.key]).length}/{s.slots.length}
                </span>
              </button>
            ))}
            {/* Reels special section */}
            <button onClick={() => setActiveSection('reels')}
              className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-200"
              style={{
                background: activeSection === 'reels' ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderLeft: activeSection === 'reels' ? '2px solid rgba(201,168,76,0.6)' : '2px solid transparent',
              }}>
              <span className="text-base">🎬</span>
              <span className={`font-jost text-[0.75rem] font-medium transition-colors ${activeSection === 'reels' ? 'text-gold' : 'text-warmgrey/70'}`}>
                Reels & Videos
              </span>
            </button>
          </nav>

          {/* Info box */}
          <div className="mt-6 p-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <p className="font-jost text-[0.62rem] text-gold/60 font-semibold mb-1">How it works</p>
            <p className="font-jost text-[0.6rem] text-warmgrey/50 leading-relaxed">
              Upload images here and they will instantly appear on the website. Drag &amp; drop or click to upload.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}>

              {activeSection === 'reels' ? (
                <ReelsManager adminKey={ADMIN_KEY} />
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h2 className="font-playfair text-xl text-ivory">{section.label}</h2>
                      <p className="font-jost text-[0.65rem] text-warmgrey/50 mt-0.5">
                        {section.slots.filter(sl => images[sl.key]).length} of {section.slots.length} images uploaded
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-1 rounded-full mb-6" style={{ background: 'rgba(201,168,76,0.1)' }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(section.slots.filter(sl => images[sl.key]).length / section.slots.length) * 100}%`,
                        background: 'linear-gradient(to right, #8B1A1A, #C9A84C)'
                      }} />
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {section.slots.map(slot => (
                        <UploadSlot
                          key={slot.key}
                          slot={slot}
                          currentUrl={images[slot.key] || null}
                          adminKey={ADMIN_KEY}
                          onUploaded={handleUploaded}
                          onDeleted={handleDeleted}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
