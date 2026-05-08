import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAdminImage } from '../context/ImageContext'

const timeline = [
  { year: '1995', title: 'The Beginning', desc: 'Vrushali Maisekar graduates BAMS from Dhondumama Sathe Medical College, Pune. Begins practice under legendary Vaidya A.V. Datar Shastri — the pioneer of Panchabhoutik Chikitsa.' },
  { year: '1998', title: 'Hospital Experience', desc: 'Joins the Skin Department at the prestigious KEM Hospital, Pune — building clinical depth in dermatology and cosmetology alongside Ayurvedic practice.' },
  { year: '2003', title: 'Arogya Mantra Founded', desc: 'Establishes Arogya Mantra Clinic at Hadapsar, Pune — with a vision to bring holistic, personalised Ayurvedic healing to the modern world.' },
  { year: '2010', title: 'Yoga Mastery', desc: 'Earns the YCB Level 6 certification — the highest yoga qualification issued by the Ministry of AYUSH, Government of India. Launches therapeutic yoga batches.' },
  { year: '2013', title: 'Hair Regain Clinic', desc: 'Expands to Hair Regain Clinic at Hadapsar — offering advanced hair treatment, wigs and patches for hair loss, alopecia, and chemotherapy patients.' },
  { year: '2020+', title: 'Awards & Recognition', desc: 'Recognised with national and international awards for outstanding contributions to Ayurveda. Continues delivering lectures at academic conferences across India.' },
]

const strengths = [
  { icon: '🏥', title: 'Doctor-Founded', desc: 'Every protocol is personally designed by Vrushali Maisekar, ensuring clinical accuracy and genuine Ayurvedic principles.' },
  { icon: '🎯', title: 'Root-Cause Focus', desc: 'We treat the source, not the symptom. Every patient receives a unique prakriti assessment and personalised plan.' },
  { icon: '🌿', title: 'Zero Compromise', desc: 'All medicines and products are pure, traditional, and free from synthetic additives. The healing is real.' },
  { icon: '🤝', title: 'Compassionate Care', desc: 'Each patient is heard, understood, and respected. We believe healing begins with trust.' },
]

function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16">
      <p className="section-label mb-3">{label}</p>
      <div className="gold-line-center" />
      <h2 className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)] mt-3">{title}</h2>
      {subtitle && <p className="font-cormorant text-lg italic text-warmgrey mt-3 max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}

export default function AboutPage() {
  const doctorImg = useAdminImage('about_doctor', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85')
  const bannerImg = useAdminImage('about_banner', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1600&q=80')
  return (
    <>
      <main className="min-h-screen" style={{ background: '#0D0807' }}>
        {/* Hero Banner */}
        <div className="relative overflow-hidden" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url('${bannerImg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'brightness(0.25)',
            }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,8,7,0.4) 0%, rgba(13,8,7,0.9) 100%)' }} />

          {/* Mandala decoration */}
          <svg className="absolute right-10 top-1/2 -translate-y-1/2 w-[300px] opacity-[0.06] pointer-events-none" viewBox="0 0 400 400" fill="none">
            {[180,140,100,60].map(r => <circle key={r} cx="200" cy="200" r={r} stroke="#C9A84C" strokeWidth="0.6" />)}
            {[0,45,90,135,180,225,270,315].map(a => (
              <ellipse key={a} cx="200" cy="60" rx="8" ry="45" fill="#C9A84C" transform={`rotate(${a} 200 200)`} />
            ))}
          </svg>

          <div className="relative max-w-[1200px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <p className="section-label mb-4">Our Story</p>
              <div className="gold-line-center" />
              <h1 className="font-playfair text-[clamp(2.5rem,6vw,5rem)] mt-4 mb-5">
                The Soul of <em className="text-gradient-gold not-italic">Arogya Mantra</em>
              </h1>
              <p className="font-cormorant text-[1.2rem] italic text-ivory/60 max-w-xl mx-auto leading-relaxed">
                Three decades of healing, thousands of lives transformed, and one unwavering commitment — your wellness.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Doctor Story Section */}
        <section className="section-pad max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}>
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
                style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                <img
                  src={doctorImg}
                  alt="Vrushali Maisekar"
                  className="w-full h-[500px] object-cover object-top"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.8) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 p-7">
                  <p className="font-playfair text-2xl text-ivory">Vrushali Maisekar</p>
                  <p className="font-jost text-[0.65rem] text-gold tracking-[0.22em] uppercase mt-1">BAMS · YCB Level 6 · Cosmetologist</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}>
              <p className="section-label mb-4">About the Founder</p>
              <div className="gold-line mb-6" />
              <h2 className="font-playfair text-[clamp(2rem,4vw,2.8rem)] leading-[1.1] mb-6">
                A Healer <em className="text-gradient-gold not-italic">Rooted</em> in<br />Ancient Wisdom
              </h2>

              <div className="space-y-5 font-jost text-[0.9rem] text-ivory/70 leading-[1.95]">
                <p>
                  Vrushali Maisekar is the founder and primary consultant of Arogya Mantra Clinic — one of Hadapsar's most trusted Ayurvedic centres since 1995. Her journey began at Dhondumama Sathe Medical College, Pune, where she earned her Bachelor of Ayurvedic Medicine and Surgery (BAMS).
                </p>
                <p>
                  She trained under two legendary masters — the late Vaidya A.V. Datar Shastri, pioneer of Panchabhoutik Chikitsa, and the renowned Dr. Vivek Haldavnekar. This rare lineage gave her a depth of knowledge that sets Arogya Mantra apart from conventional practice.
                </p>
                <p>
                  After gaining hospital experience at the Skin Department of KEM Hospital, Pune, she dedicated herself to building a clinic where every patient is treated as an individual — with personalised care, genuine herbs, and attention to the root cause.
                </p>
                <p>
                  She holds the prestigious YCB Level 6 certification in Yoga — the highest qualification in India under the Ministry of AYUSH — and delivers lectures at national and international Ayurvedic conferences.
                </p>
              </div>

              <div className="mt-8 flex gap-4 flex-wrap">
                <Link to="/book" className="btn-primary">Book Consultation</Link>
                <Link to="/services" className="btn-outline">Our Services</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote section */}
        <section className="py-20" style={{ background: 'linear-gradient(to right, #1A100C, #0D0807)' }}>
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <p className="font-playfair text-4xl text-gold/30 mb-4">"</p>
              <p className="font-cormorant text-[clamp(1.4rem,3vw,2rem)] italic text-ivory/75 leading-[1.65] mb-6">
                Blending ancient knowledge with modern science is what makes Arogya Mantra stand apart. Each patient receives individual care with attention to every detail.
              </p>
              <div className="ornamental-divider mb-4">
                <span className="font-cormorant text-gold/60 text-sm italic">Vrushali Maisekar</span>
              </div>
              <p className="font-jost text-[0.6rem] text-warmgrey/50 tracking-[0.22em] uppercase">Founder · Arogya Mantra</p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-pad max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Our Journey"
            title={<>A Legacy Built on <em className="text-gradient-gold not-italic">Trust</em></>}
            subtitle="Three decades of clinical wisdom, shaped by dedication"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)' }} />

            <div className="space-y-12">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 pl-12 md:pl-0 ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}>
                  {/* Year circle */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                    style={{ background: '#8B1A1A', border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 15px rgba(139,26,26,0.4)' }}>
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 md:max-w-[45%] p-6 rounded-2xl ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}
                    style={{ background: 'rgba(26,16,12,0.8)', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <span className="font-playfair text-gold text-2xl font-medium">{t.year}</span>
                    <h3 className="font-playfair text-ivory text-lg font-medium mt-1 mb-2">{t.title}</h3>
                    <p className="font-jost text-[0.82rem] text-warmgrey leading-[1.8]">{t.desc}</p>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="section-pad" style={{ background: '#1A100C' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionHeader
              label="Our Strengths"
              title={<>What Makes Us <em className="text-gradient-gold not-italic">Different</em></>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {strengths.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-7 rounded-2xl text-center"
                  style={{ background: '#0D0807', border: '1px solid rgba(201,168,76,0.1)' }}>
                  <span className="text-4xl mb-4 block">{s.icon}</span>
                  <h3 className="font-playfair text-ivory text-lg font-medium mb-3">{s.title}</h3>
                  <p className="font-jost text-[0.82rem] text-warmgrey leading-[1.75]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="max-w-[600px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}>
              <p className="font-cormorant text-xl italic text-ivory/50 mb-6">
                Begin your journey to lasting wellness today
              </p>
              <Link to="/book" className="btn-primary inline-flex text-sm px-10 py-4">
                Book Your Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
