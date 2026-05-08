import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQS } from '../data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #1A100C 0%, #0D0807 100%)' }}>
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />

      <div className="relative max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14">
          <p className="section-label">Know Before You Come</p>
          <div className="gold-line-center" />
          <h2 className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] mt-2">
            Common <em className="text-gold not-italic">Questions</em>
          </h2>
          <p className="font-cormorant text-lg italic text-warmgrey/70 mt-3">
            Answers to what our patients ask most
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-0">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={itemVariants}
              className="border-b transition-colors duration-300"
              style={{ borderColor: open === i ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.08)' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4 group">
                {/* Number */}
                <span className="font-jost text-[0.6rem] font-bold tracking-widest text-gold/40 flex-shrink-0 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-playfair text-[1.02rem] font-medium flex-1 transition-colors duration-300 ${open === i ? 'text-gold' : 'text-ivory group-hover:text-gold'}`}>
                  {faq.q}
                </span>
                {/* Animated icon */}
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
                    open === i ? 'bg-crimson border-crimson' : 'border-gold/30 group-hover:border-gold/60'
                  }`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke={open === i ? 'white' : '#C9A84C'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: 'hidden' }}>
                    <div className="pb-6 pl-10 pr-8">
                      <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
                      <p className="font-cormorant text-[1.05rem] italic text-warmgrey leading-[1.85]">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center">
          <p className="font-jost text-sm text-warmgrey/60 mb-5">Still have questions?</p>
          <a href="/#contact"
            className="btn-outline text-[0.68rem] px-7 py-3">
            Talk to Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
