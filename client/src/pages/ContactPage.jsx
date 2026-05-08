import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" fill="rgba(139,26,26,0.6)" stroke="#8B1A1A" strokeWidth="0.8"/>
        <circle cx="10" cy="7" r="2.2" fill="#C9A84C" opacity="0.95"/>
      </svg>
    ),
    label: 'Main Clinic',
    value: '501, City Center, Opp. Vaibhav Complex\nHadapsar, Pune — 411028',
    link: 'https://www.google.com/maps/search/501+City+Center+opposite+Vaibhav+Complex+Hadapsar+Pune+Maharashtra+411028',
    linkLabel: 'Get Directions →',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" fill="rgba(139,26,26,0.4)" stroke="rgba(139,26,26,0.7)" strokeWidth="0.8"/>
        <circle cx="10" cy="7" r="2.2" fill="#C9A84C" opacity="0.7"/>
      </svg>
    ),
    label: 'Hair Regain Clinic',
    value: 'Angan Complex, First Floor\nMagarpatta Road, Hadapsar, Pune',
    link: null,
    linkLabel: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3.5 5C3.5 4.17 4.17 3.5 5 3.5h2l1.1 3-1.4 1.4c1.1 2.2 2.9 4 5.1 5.1L13.2 11.7l3 1.1v2c0 .83-.67 1.5-1.5 1.5C7.1 16.3 3.5 12.7 3.5 8V5z" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.8)" strokeWidth="1"/>
      </svg>
    ),
    label: 'Phone / WhatsApp',
    value: '+91-9545453720',
    link: 'https://wa.me/919545453720',
    linkLabel: 'WhatsApp Now →',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="rgba(201,168,76,0.6)" strokeWidth="1"/>
        <path d="M10 5.5v5l2.8 2.8" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Clinic Hours',
    value: 'Monday – Saturday\n5:30 PM – 8:00 PM',
    link: null,
    linkLabel: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="rgba(201,168,76,0.6)" strokeWidth="1"/>
        <path d="M2.5 8l7.5 4 7.5-4" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email',
    value: 'contact@arogyamantra.com',
    link: 'mailto:contact@arogyamantra.com',
    linkLabel: 'Send Email →',
  },
]

function FloatingInput({ label, type = 'text', name, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value

  return (
    <div className="relative">
      <label
        className="absolute left-4 transition-all duration-300 pointer-events-none font-jost"
        style={{
          top: isActive ? '8px' : '50%',
          transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isActive ? '0.58rem' : '0.82rem',
          letterSpacing: isActive ? '0.15em' : '0.05em',
          textTransform: isActive ? 'uppercase' : 'none',
          color: focused ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.45)',
        }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-7 pb-3 px-4 text-ivory font-jost text-sm font-light focus:outline-none transition-all duration-300"
        style={{
          borderBottom: `1px solid ${focused ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.2)'}`,
          boxShadow: focused ? '0 1px 0 rgba(201,168,76,0.4)' : 'none',
        }}
      />
    </div>
  )
}

function FloatingTextarea({ label, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value

  return (
    <div className="relative">
      <label
        className="absolute left-4 transition-all duration-300 pointer-events-none font-jost"
        style={{
          top: isActive ? '8px' : '20px',
          transform: 'translateY(0)',
          fontSize: isActive ? '0.58rem' : '0.82rem',
          letterSpacing: isActive ? '0.15em' : '0.05em',
          textTransform: isActive ? 'uppercase' : 'none',
          color: focused ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.45)',
        }}>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-8 pb-3 px-4 text-ivory font-jost text-sm font-light focus:outline-none resize-none transition-all duration-300"
        style={{
          borderBottom: `1px solid ${focused ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.2)'}`,
          boxShadow: focused ? '0 1px 0 rgba(201,168,76,0.4)' : 'none',
        }}
      />
    </div>
  )
}

const CONCERNS = ['Hair Loss', 'Skin Issues', 'Joint Pain', 'Digestive', 'Stress / Sleep', 'General Wellness', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', concern: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0807' }}>

      {/* Hero */}
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 30% 50%, rgba(139,26,26,0.12) 0%, transparent 65%)' }} />

        {/* Floating mandala ornament top-right */}
        <div className="absolute top-20 right-[-80px] w-[320px] h-[320px] opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 300 300" fill="none">
            {[130, 105, 80, 55, 30].map((r, i) => (
              <circle key={r} cx="150" cy="150" r={r}
                stroke={i % 2 === 0 ? '#C9A84C' : '#8B1A1A'} strokeWidth="0.5" />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
              <ellipse key={a} cx="150" cy="30" rx="6" ry="30" fill="#C9A84C" opacity="0.5"
                transform={`rotate(${a} 150 150)`} />
            ))}
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-label mb-4">
            Get In Touch
          </motion.p>
          <div className="gold-line" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-[clamp(2.8rem,6.5vw,5rem)] font-normal leading-[1.05] mt-4 mb-4">
            <span className="text-ivory">Start Your</span>
            <br />
            <em className="text-gradient-gold not-italic">Healing Journey</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-cormorant italic text-[clamp(1rem,1.8vw,1.25rem)] text-ivory/50 max-w-md">
            We would love to hear from you. Reach out to us and let the healing begin.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">

          {/* LEFT: Info */}
          <div>
            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3 mb-10">
              {INFO.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.5 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex gap-4 p-4 rounded-xl border transition-all duration-300 group"
                  style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.background = 'rgba(201,168,76,0.02)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.3)' }}>
                    {d.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-jost text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-gold mb-1">{d.label}</p>
                    <p className="font-jost text-[0.85rem] text-ivory/60 leading-relaxed whitespace-pre-line">{d.value}</p>
                    {d.link && (
                      <a href={d.link} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-1.5 font-jost text-[0.65rem] text-gold/60 hover:text-gold transition-colors duration-300 tracking-wider">
                        {d.linkLabel}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-3 mb-12">
              <a href="https://wa.me/919545453720" target="_blank" rel="noopener noreferrer"
                className="btn-primary py-3 px-6 text-[0.65rem] items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link to="/book" className="btn-outline py-3 px-6 text-[0.65rem]">
                Book Appointment
              </Link>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="relative">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-12 h-12 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
                <div className="absolute top-0 left-0 h-full w-px" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'linear-gradient(to left, #C9A84C, transparent)' }} />
                <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: 'linear-gradient(to top, #C9A84C, transparent)' }} />
              </div>
              <div className="rounded-2xl overflow-hidden h-[260px] border border-gold/15"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <iframe
                  title="Arogya Mantra Location"
                  src="https://www.google.com/maps?q=501+City+Center+opposite+Vaibhav+Complex+Hadapsar+Pune+Maharashtra+411028&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) saturate(0.5) brightness(0.8)' }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-sage animate-pulse-dot" />
                  <span className="font-jost text-[0.7rem] text-ivory/50">Open Today · 5:30 PM – 8:00 PM</span>
                </div>
                <span className="font-jost text-[0.65rem] text-gold/50 tracking-wider">Mon – Sat</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>

            <div className="relative p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(201,168,76,0.12)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
              }}>

              {/* Top label */}
              <div className="mb-8">
                <p className="font-jost text-[0.6rem] font-semibold tracking-[0.28em] uppercase text-gold/70 mb-3">Send an Enquiry</p>
                <h2 className="font-playfair text-[clamp(1.5rem,3vw,2.2rem)] text-ivory leading-tight">
                  How can we <em className="text-gold not-italic">help you?</em>
                </h2>
                <p className="font-cormorant italic text-ivory/40 text-sm mt-2">
                  Our team responds within 24 hours
                </p>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-12">
                    <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ background: 'rgba(74,103,65,0.15)', border: '1px solid rgba(74,103,65,0.4)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l4 4 10-10" stroke="#4A6741" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-playfair text-2xl text-ivory mb-2">Message Received</h3>
                    <p className="font-cormorant italic text-ivory/50 mb-6">
                      Thank you for reaching out. We will contact you shortly.
                    </p>
                    <p className="font-jost text-[0.65rem] tracking-[0.2em] uppercase text-gold/60">
                      — Arogya Mantra Team
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FloatingInput label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                      <FloatingInput label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    <FloatingInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />

                    {/* Concern selector */}
                    <div>
                      <p className="font-jost text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-gold/60 mb-3">Primary Concern</p>
                      <div className="flex flex-wrap gap-2">
                        {CONCERNS.map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, concern: c }))}
                            className="px-3.5 py-1.5 rounded-full font-jost text-[0.62rem] font-semibold tracking-wider uppercase transition-all duration-300"
                            style={{
                              color: form.concern === c ? '#0D0807' : 'rgba(245,236,215,0.5)',
                              background: form.concern === c ? '#C9A84C' : 'rgba(201,168,76,0.06)',
                              border: `1px solid ${form.concern === c ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                            }}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FloatingTextarea label="Your Message" name="message" value={form.message} onChange={handleChange} />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center py-4 text-[0.7rem] disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                            <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 7l12-6-6 12-1.5-5.5L1 7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                          </svg>
                          Send Message
                        </span>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-8 py-4 px-6 rounded-xl"
              style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}>
              {[
                { n: '25+', l: 'Years of practice' },
                { n: '4.8★', l: 'Justdial rating' },
                { n: '5000+', l: 'Lives healed' },
              ].map(s => (
                <div key={s.n} className="text-center">
                  <p className="font-playfair text-xl text-gold leading-none">{s.n}</p>
                  <p className="font-jost text-[0.58rem] tracking-[0.18em] uppercase text-warmgrey mt-1">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
