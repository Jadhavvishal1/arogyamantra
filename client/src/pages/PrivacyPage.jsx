import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide when booking appointments (name, phone, email, preferred date, health concern), placing orders (shipping address, contact details), or contacting us. We do not collect sensitive medical records beyond what is voluntarily shared in consultation forms.',
  },
  {
    title: 'How We Use Your Information',
    content: 'Your information is used solely to: confirm and manage your appointments, process and deliver orders, communicate with you regarding your queries, and improve our services. We do not use your data for unsolicited marketing without your consent.',
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. Your data is stored securely and access is restricted to authorised clinic staff only.',
  },
  {
    title: 'Sharing of Information',
    content: 'We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist in operating our website or conducting our business, under strict confidentiality agreements.',
  },
  {
    title: 'Cookies',
    content: 'Our website may use cookies to enhance your browsing experience. Cookies are small files placed on your device that help us understand how you use our site. You may choose to disable cookies in your browser settings, though this may affect certain features of the website.',
  },
  {
    title: 'Health Information',
    content: 'Any health information you share (such as symptoms or medical history in booking forms) is treated with the highest level of confidentiality. It is used exclusively for treatment purposes and is never shared without your explicit consent.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us directly. We will respond to your request within a reasonable timeframe.',
  },
  {
    title: 'Third-Party Links',
    content: 'Our website may contain links to external platforms (such as Justdial, Practo, Instagram). We are not responsible for the privacy practices of these third-party websites and encourage you to review their policies.',
  },
  {
    title: 'Children\'s Privacy',
    content: 'Our services are not directed to children under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.',
  },
  {
    title: 'Updates to This Policy',
    content: 'We reserve the right to update this Privacy Policy from time to time. Changes will be reflected on this page with a revised effective date. Your continued use of the website constitutes acceptance of any changes.',
  },
  {
    title: 'Contact Us',
    content: 'For any privacy-related concerns or requests, please contact us at: Arogya Mantra, 501, City Center, Hadapsar, Pune 411028. We take your privacy seriously and will respond promptly.',
  },
]

export default function PrivacyPage() {
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
            <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] mt-4">Privacy Policy</h1>
            <p className="font-cormorant text-lg italic text-warmgrey mt-3">
              Your privacy matters to us · Effective {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>

        {/* Intro */}
        <div className="max-w-[800px] mx-auto px-6 pt-16 pb-4">
          <div className="p-7 rounded-2xl mb-12"
            style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <p className="font-cormorant text-[1.1rem] italic text-ivory/70 leading-[1.8]">
              At Arogya Mantra, we value the trust you place in us — both for your wellness journey and your personal data. This policy explains how we collect, use, and protect your information with the same care we give every patient.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-6 pb-20">
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
            <Link to="/terms" className="btn-ghost text-sm">Terms & Conditions →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
