import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing and using the Arogya Mantra website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.',
  },
  {
    title: 'Medical Disclaimer',
    content: 'The information provided on this website is for general informational and educational purposes only. It is not intended as, and shall not be understood or construed as, professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Ayurvedic treatment outcomes vary from person to person.',
  },
  {
    title: 'Appointment Booking',
    content: 'Appointment requests made through our website are subject to availability and confirmation by the clinic. Submitting a booking form does not guarantee a confirmed appointment until you receive a confirmation call from our team. We reserve the right to reschedule or cancel appointments with prior notice.',
  },
  {
    title: 'Products & Purchases',
    content: 'All products listed on this website are formulated by Vrushali Maisekar and are purely Ayurvedic. Prices are subject to change without notice. Orders once placed cannot be cancelled after dispatch. We do not accept returns on opened products. In case of damaged goods, please contact us within 48 hours with photographic evidence.',
  },
  {
    title: 'Intellectual Property',
    content: 'All content on this website — including text, graphics, logos, images, and design — is the property of Arogya Mantra and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without express written permission.',
  },
  {
    title: 'Testimonials & Reviews',
    content: 'Patient testimonials and reviews displayed on this website are genuine accounts from our patients. Individual results may vary. We do not make guarantees about specific outcomes from any treatment or product.',
  },
  {
    title: 'Limitation of Liability',
    content: 'Arogya Mantra, its founders, staff, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website or our services, including but not limited to health outcomes, delays, or inaccuracies in information.',
  },
  {
    title: 'Governing Law',
    content: 'These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    content: 'For any questions regarding these Terms, please contact us at 501, City Center, Hadapsar, Pune 411028 or through our website contact form.',
  },
]

export default function TermsPage() {
  return (
    <>
      <main style={{ background: '#0D0807', paddingTop: '100px' }}>
        {/* Header */}
        <div className="py-20 text-center" style={{ background: '#1A100C', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">Legal</p>
            <div className="gold-line-center" />
            <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] mt-4">Terms & Conditions</h1>
            <p className="font-cormorant text-lg italic text-warmgrey mt-3">
              Effective from {new Date().getFullYear()} · Arogya Mantra
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-6 py-20">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-jost text-[0.6rem] font-bold text-gold/40 w-7 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-playfair text-xl text-ivory font-medium">{s.title}</h2>
                </div>
                <div className="h-px mb-4 ml-11" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />
                <p className="font-jost text-[0.88rem] text-warmgrey leading-[1.9] ml-11">{s.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex gap-4 justify-center">
            <Link to="/" className="btn-outline text-sm">Return Home</Link>
            <Link to="/privacy" className="btn-ghost text-sm">Privacy Policy →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
