import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { SERVICES } from '../data'

const panchakarmaDetails = [
  { name: 'Snehan & Abhyanga', desc: 'Medicated oil application externally and internally. Deep massage with different oils moves toxins toward the gut for elimination. Deeply relaxing and therapeutic.' },
  { name: 'Swedan', desc: 'Therapeutic steaming and fomentation. Opens channels, increases circulation, and prepares the body for deeper cleansing procedures.' },
  { name: 'Shirodhara', desc: 'A gentle stream of medicated oil, kashaya, milk or buttermilk poured over the forehead. Profoundly calming for the nervous system, insomnia, stress, and hairloss.' },
  { name: 'Sarvanga Dhara', desc: 'Similar to Shirodhara but performed all over the body with warm kashayam or oils. Relieves chronic pain, neurological conditions, and certain skin disorders.' },
  { name: 'Vaman', desc: 'Therapeutic emesis following Snehan-Swedan. Cleanses accumulated Kapha. Effective for asthma, certain skin conditions, and metabolic disorders.' },
  { name: 'Virechan', desc: 'Therapeutic purgation. Removes doshas through stools using Ayurvedic medicines. Excellent for digestive disorders, skin diseases, and liver health.' },
  { name: 'Basti', desc: 'Considered half the treatment in Ayurveda. Medicated oils or kashayam administered through the anal passage. Highly effective for various types of pain, constipation, and ulcerative colitis.' },
  { name: 'Nasya', desc: 'Administration of Ayurvedic medicines through the nose — considered the gateway to the head. Used for hairfall, headache, chronic cold, sinusitis, stress, and cognitive wellness.' },
  { name: 'Rakta Mokshan', desc: 'Blood purification through a vein or leech therapy. Helps in pimples, skin disorders, pain relief, and certain cases of poisoning. Performed with full clinical care.' },
]

const hairWigInfo = {
  products: ['Hair patches for men', 'Hair patches for women', 'Hair wigs for men', 'Hair wigs for women', 'Wigs for chemotherapy patients'],
  services: ['Hair bonding', 'Hair clipping', 'Hair extensions', 'Toppers & patches for women', 'Natural-look wigs for cancer patients'],
  whyUs: ['Quick makeover', 'Painless, no scar, no stitches', 'Free of side effects', 'Pocket-friendly', 'Easy to maintain', 'No lifestyle restrictions'],
}

// Custom icons matching data.js
const ServiceIcons = {
  'five-elements': () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="14" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      {[0,72,144,216,288].map((a, i) => {
        const rad = (a - 90) * Math.PI / 180
        const x = 20 + 10 * Math.cos(rad)
        const y = 20 + 10 * Math.sin(rad)
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#C9A84C" opacity="0.7" />
      })}
      <circle cx="20" cy="20" r="4" fill="#8B1A1A" opacity="0.8" />
      <circle cx="20" cy="20" r="1.5" fill="#C9A84C" />
    </svg>
  ),
  lotus: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M20 32C17 27 9 22 10 15C11 11 14 9 17 10.5C18.2 11.2 19.3 12.5 20 14C20.7 12.5 21.8 11.2 23 10.5C26 9 29 11 30 15C31 22 23 27 20 32Z" fill="#C9A84C" opacity="0.8" />
      <path d="M20 32C19.5 27 13 23 15 17" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
      <ellipse cx="20" cy="32" rx="2" ry="1.2" fill="#C9A84C" opacity="0.5" />
    </svg>
  ),
  'water-drop': () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M20 7C20 7 9 18 9 25A11 11 0 0 0 31 25C31 18 20 7 20 7Z" fill="#C9A84C" opacity="0.8" />
      <ellipse cx="15" cy="22" rx="3" ry="5" fill="rgba(255,255,255,0.12)" transform="rotate(-25 15 22)" />
    </svg>
  ),
  skin: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="13" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      <path d="M13 14Q20 10 27 14Q30 20 27 26Q20 30 13 26Q10 20 13 14Z" fill="#C9A84C" opacity="0.7" />
      <circle cx="20" cy="20" r="5" fill="rgba(139,26,26,0.6)" />
      <circle cx="20" cy="20" r="2" fill="#C9A84C" />
    </svg>
  ),
  leaf: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M9 30 C9 30 11 15 20 9 C29 3 32 9 32 9 C32 9 32 22 23 26 C17 29 12 30 9 30Z" fill="#C9A84C" opacity="0.8" />
      <path d="M9 30 L22 16" stroke="rgba(13,8,7,0.4)" strokeWidth="1.2" />
    </svg>
  ),
  om: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M11 14 C11 10 14 8 17 10 C20 12 20 16 17 19 C20 19 23 20 23 23 C23 27 19 29 16 27" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M20 19 C23 17 26 19 27 22" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M11 25 C11 28 14 31 18 30" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M23 29 C23 32 26 33 28 31" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="28" cy="11" r="2.5" fill="#C9A84C" opacity="0.7" />
    </svg>
  ),
}

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen" style={{ background: '#0D0807', paddingTop: '100px' }}>
        {/* Hero */}
        <div className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)',
            }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,8,7,0.5), rgba(13,8,7,0.95))' }} />

          <motion.div className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <p className="section-label mb-4">Healing Arts</p>
            <div className="gold-line-center" />
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,5rem)] mt-4 mb-5">
              Our <em className="text-gradient-gold not-italic">Services</em>
            </h1>
            <p className="font-cormorant text-[1.2rem] italic text-ivory/60 max-w-xl mx-auto">
              Every therapy, every protocol, every herb — chosen with care for you.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <section className="section-pad max-w-[1200px] mx-auto px-6">
          <div className="space-y-20">
            {SERVICES.map((svc, i) => {
              const Icon = ServiceIcons[svc.icon] || ServiceIcons.leaf
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                  {/* Image */}
                  <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-card"
                      style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                      <img src={svc.image} alt={svc.title} className="w-full h-72 object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.7) 0%, transparent 60%)' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(139,26,26,0.2)', border: '1px solid rgba(201,168,76,0.2)' }}>
                        <Icon />
                      </div>
                      <div>
                        <p className="font-jost text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold/60 mb-1">Service {i + 1}</p>
                        <h2 className="font-playfair text-2xl text-ivory font-medium">{svc.title}</h2>
                      </div>
                    </div>

                    <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />

                    <p className="font-jost text-[0.9rem] text-ivory/70 leading-[1.95] mb-5">{svc.description}</p>
                    <p className="font-cormorant text-[1.05rem] italic text-ivory/50 leading-relaxed mb-6">{svc.short}</p>

                    {/* Conditions treated */}
                    <div className="mb-6">
                      <p className="font-jost text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-warmgrey/60 mb-3">Conditions Treated</p>
                      <div className="flex flex-wrap gap-2">
                        {svc.conditions.map(c => (
                          <span key={c} className="font-jost text-[0.72rem] font-medium px-3.5 py-1.5 rounded-full"
                            style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to="/book" className="btn-primary inline-flex">Book This Service</Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Panchakarma Deep-Dive */}
        <section className="section-pad" style={{ background: '#1A100C' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14">
              <p className="section-label mb-3">Deep Dive</p>
              <div className="gold-line-center" />
              <h2 className="font-playfair text-[clamp(2rem,4vw,3rem)] mt-3">
                Panchakarma <em className="text-gradient-gold not-italic">Procedures</em>
              </h2>
              <p className="font-cormorant text-lg italic text-warmgrey mt-3 max-w-md mx-auto">
                Nine powerful therapies, each precisely indicated for your condition
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {panchakarmaDetails.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="p-6 rounded-2xl"
                  style={{ background: '#0D0807', border: '1px solid rgba(201,168,76,0.1)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A84C' }} />
                    <h3 className="font-playfair text-[1.05rem] text-ivory font-medium">{p.name}</h3>
                  </div>
                  <p className="font-jost text-[0.82rem] text-warmgrey leading-[1.75]">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hair Regain Clinic */}
        <section className="section-pad max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <p className="section-label mb-3">Hair Regain Clinic</p>
            <div className="gold-line-center" />
            <h2 className="font-playfair text-[clamp(2rem,4vw,3rem)] mt-3">
              Natural Look. <em className="text-gradient-gold not-italic">Real Confidence.</em>
            </h2>
            <p className="font-cormorant text-lg italic text-warmgrey mt-3 max-w-lg mx-auto">
              10+ years of experience in wigs, patches, and hair restoration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Products', items: hairWigInfo.products },
              { title: 'Services', items: hairWigInfo.services },
              { title: 'Why Choose Us', items: hairWigInfo.whyUs },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-7 rounded-2xl"
                style={{ background: '#1A100C', border: '1px solid rgba(201,168,76,0.12)' }}>
                <h3 className="font-playfair text-xl text-ivory mb-4">{col.title}</h3>
                <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
                <ul className="space-y-3">
                  {col.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="7" cy="7" r="5" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
                        <circle cx="7" cy="7" r="2" fill="#C9A84C" opacity="0.7" />
                      </svg>
                      <span className="font-jost text-[0.82rem] text-warmgrey leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Book CTA */}
        <section className="py-24 text-center"
          style={{ background: 'linear-gradient(to right, #1A100C, #0D0807)' }}>
          <div className="max-w-[500px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <p className="font-cormorant text-xl italic text-ivory/50 mb-6 leading-relaxed">
                Every healing journey begins with a single consultation
              </p>
              <Link to="/book" className="btn-primary inline-flex text-sm px-10 py-4">
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
