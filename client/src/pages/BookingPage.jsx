import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import Footer from '../components/Footer'

const SERVICES_LIST = [
  'Panchabhoutik Chikitsa',
  'Yoga Therapy',
  'Panchakarma',
  'Abhyanga / Shirodhara',
  'Skinergy / Skin Treatment',
  'Hair Regain Clinic',
  'Women\'s Health',
  'General Consultation',
]

const TIME_SLOTS = ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM']

function CalendarPicker({ selected, onSelect }) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa']

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1))

  const isDisabled = (day) => {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t || d.getDay() === 0
  }

  const isSelected = (day) => {
    if (!selected) return false
    const d = new Date(year, month, day)
    const s = new Date(selected)
    return d.toDateString() === s.toDateString()
  }

  const isToday = (day) => {
    const d = new Date(year, month, day)
    return d.toDateString() === today.toDateString()
  }

  const handleSelect = (day) => {
    if (isDisabled(day)) return
    const d = new Date(year, month, day)
    onSelect(d.toISOString().split('T')[0])
  }

  return (
    <div className="rounded-2xl p-5" style={{ background: '#0D0807', border: '1px solid rgba(201,168,76,0.15)' }}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-200"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          ‹
        </button>
        <p className="font-playfair text-ivory font-medium">
          {monthNames[month]} {year}
        </p>
        <button onClick={nextMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-200"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          ›
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map(d => (
          <div key={d} className="text-center font-jost text-[0.62rem] font-semibold tracking-wider uppercase py-1"
            style={{ color: 'rgba(154,143,133,0.6)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1
          const disabled = isDisabled(day)
          const selected_ = isSelected(day)
          const today_ = isToday(day)
          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              disabled={disabled}
              className="aspect-square rounded-lg flex items-center justify-center font-jost text-[0.8rem] transition-all duration-200"
              style={{
                background: selected_ ? '#8B1A1A' : today_ ? 'rgba(201,168,76,0.1)' : 'transparent',
                border: selected_ ? '1px solid rgba(139,26,26,0.8)' : today_ ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
                color: disabled ? 'rgba(154,143,133,0.25)' : selected_ ? 'white' : today_ ? '#C9A84C' : 'rgba(245,236,215,0.8)',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}>
              {day}
            </button>
          )
        })}
      </div>

      <p className="font-jost text-[0.6rem] text-warmgrey/40 text-center mt-3 tracking-wider">
        Sundays unavailable · Clinic hours: Mon–Sat 5:30 PM–8:00 PM
      </p>
    </div>
  )
}

export default function BookingPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    service: '', date: '', timeSlot: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/appointments', {
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        email: form.email,
        service: form.service,
        preferredDate: form.date ? `${form.date} ${form.timeSlot}` : '',
        message: form.message,
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const details = [
    { icon: MapPin, label: 'Main Clinic', val: '501, City Center, Hadapsar, Pune 411028' },
    { icon: MapPin, label: 'Hair Regain Clinic', val: 'Angan Complex, Magarpatta Road, Hadapsar' },
    { icon: Clock, label: 'Clinic Hours', val: 'Monday to Saturday · 5:30 PM – 8:00 PM' },
  ]

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <>
      <main className="min-h-screen" style={{ background: '#0D0807', paddingTop: '98px' }}>
        {/* Compact Banner */}
        <div className="relative py-12 text-center overflow-hidden">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1600&q=80')`,
              backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.15)',
            }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,8,7,0.3), rgba(13,8,7,0.98))' }} />
          <motion.div className="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-2">Begin Your Journey</p>
            <h1 className="font-playfair text-[clamp(2rem,4vw,3.2rem)] mt-2">
              Book an <em className="text-gradient-gold not-italic">Appointment</em>
            </h1>
            <p className="font-cormorant text-lg italic text-ivory/50 mt-2">Personalised Ayurvedic care, one conversation away.</p>
          </motion.div>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8">

            {/* Info Column — compact */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3">
              {details.map((d, i) => {
                const Icon = d.icon
                return (
                  <div key={i} className="flex gap-3 p-4 rounded-xl"
                    style={{ background: '#1A100C', border: '1px solid rgba(201,168,76,0.08)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.25)' }}>
                      <Icon size={13} style={{ color: '#C9A84C' }} />
                    </div>
                    <div>
                      <p className="font-jost text-[0.58rem] font-semibold tracking-widest uppercase text-gold/70 mb-0.5">{d.label}</p>
                      <p className="font-jost text-[0.8rem] text-ivory/60 leading-snug">{d.val}</p>
                    </div>
                  </div>
                )
              })}

              <a href="https://wa.me/919545453720" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(37,211,102,0.8)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <div>
                  <p className="font-jost text-[0.72rem] font-semibold" style={{ color: 'rgba(37,211,102,0.85)' }}>Chat on WhatsApp</p>
                  <p className="font-jost text-[0.62rem] text-warmgrey/50 mt-0.5">Quick questions &amp; booking</p>
                </div>
              </a>

              <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}>
                <p className="font-cormorant text-base italic text-gold/55">"स्वस्थस्य स्वास्थ्य रक्षणम्"</p>
                <p className="font-jost text-[0.58rem] text-warmgrey/40 tracking-wider mt-1">Protection of health is the highest duty</p>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: '#1A100C', border: '1px solid rgba(201,168,76,0.12)' }}>
                {!submitted ? (
                  <>
                    <h3 className="font-playfair text-xl text-ivory mb-1">Schedule Your Visit</h3>
                    <div className="gold-line mb-6" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">First Name *</label>
                          <input name="firstName" value={form.firstName} onChange={handleChange} required className="form-input" placeholder="Aarav" />
                        </div>
                        <div>
                          <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">Last Name *</label>
                          <input name="lastName" value={form.lastName} onChange={handleChange} required className="form-input" placeholder="Sharma" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">Phone *</label>
                          <input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="form-input" placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">Email</label>
                          <input name="email" value={form.email} onChange={handleChange} type="email" className="form-input" placeholder="you@email.com" />
                        </div>
                      </div>

                      <div>
                        <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">Service *</label>
                        <select name="service" value={form.service} onChange={handleChange} required className="form-input">
                          <option value="">Select a service</option>
                          {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-2">Preferred Date</label>
                        <CalendarPicker selected={form.date} onSelect={(d) => setForm(f => ({ ...f, date: d }))} />
                        {form.date && <p className="font-jost text-[0.72rem] text-gold mt-2">✓ {formatDateDisplay(form.date)}</p>}
                      </div>

                      {form.date && (
                        <div>
                          <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-2">Preferred Time</label>
                          <div className="flex flex-wrap gap-2">
                            {TIME_SLOTS.map(t => (
                              <button key={t} type="button" onClick={() => setForm(f => ({ ...f, timeSlot: t }))}
                                className="px-3.5 py-1.5 rounded-lg font-jost text-[0.7rem] font-semibold tracking-wide transition-all duration-200"
                                style={{
                                  background: form.timeSlot === t ? '#8B1A1A' : 'rgba(201,168,76,0.04)',
                                  border: `1px solid ${form.timeSlot === t ? 'rgba(139,26,26,0.7)' : 'rgba(201,168,76,0.18)'}`,
                                  color: form.timeSlot === t ? 'white' : 'rgba(201,168,76,0.65)',
                                }}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="font-jost text-[0.58rem] tracking-widest uppercase text-warmgrey/60 block mb-1.5">Your Concern</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                          className="form-input resize-none" placeholder="Describe your health concern briefly..." />
                      </div>

                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-[0.72rem]">
                        {loading ? 'Sending...' : 'Confirm Appointment →'}
                      </button>
                      <p className="text-center font-jost text-[0.6rem] text-warmgrey/35">We will call within 24 hours to confirm your slot.</p>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                    className="text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(74,103,65,0.15)', border: '2px solid rgba(74,103,65,0.35)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12L10 17L19 8" stroke="#6B9560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-playfair text-2xl text-gold mb-2">Appointment Requested!</h3>
                    <p className="font-jost text-sm text-warmgrey leading-relaxed max-w-xs mx-auto mb-2">
                      Namaste! Our team will call you within 24 hours to confirm your slot.
                    </p>
                    {form.date && (
                      <p className="font-cormorant text-base italic text-ivory/50 mb-7">
                        {formatDateDisplay(form.date)}{form.timeSlot ? ` · ${form.timeSlot}` : ''}
                      </p>
                    )}
                    <button onClick={() => { setSubmitted(false); setForm({ firstName:'',lastName:'',phone:'',email:'',service:'',date:'',timeSlot:'',message:'' }) }}
                      className="btn-outline text-[0.68rem] px-6 py-3">Book Another</button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
