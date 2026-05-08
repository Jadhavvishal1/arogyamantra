import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { PRODUCTS } from '../data'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'hair', label: 'Hair Care' },
  { key: 'skin', label: 'Skin' },
  { key: 'body', label: 'Body' },
  { key: 'wellness', label: 'Wellness' },
]

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function ShopPreview() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)
  // Show only first 4 on homepage
  const preview = filtered.slice(0, 4)

  return (
    <section id="shop" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #1A100C 0%, #0D0807 100%)' }}>
      {/* Background glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,26,26,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)' }} />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label">Pure & Handcrafted</motion.p>
            <div className="gold-line" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-[clamp(2rem,4vw,3rem)] mt-1">
              Our <em className="text-gold not-italic">Apothecary</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-cormorant text-lg italic text-warmgrey mt-2 max-w-md leading-relaxed">
              25 years of clinical expertise, bottled for you.
            </motion.p>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-2 mt-6">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`px-5 py-2 rounded-full font-jost text-[0.72rem] font-semibold tracking-wider uppercase border transition-all duration-300 ${
                    active === tab.key
                      ? 'bg-crimson border-crimson text-white shadow-crimson'
                      : 'border-gold/20 text-warmgrey hover:border-gold/50 hover:text-gold'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/shop" className="btn-outline flex-shrink-0">
              View All Products <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {preview.map(product => (
              <motion.div key={product._id} variants={cardVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl"
          style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <div>
            <p className="font-playfair text-ivory text-base">
              {filtered.length > 4 && `+${filtered.length - 4} more products available`}
              {filtered.length <= 4 && 'Browse our full Ayurvedic collection'}
            </p>
            <p className="font-jost text-xs text-warmgrey/60 mt-1">Free of chemicals · Doctor formulated · Handcrafted</p>
          </div>
          <Link to="/shop" className="btn-primary text-[0.65rem] px-7 py-3 flex-shrink-0">
            Explore Full Shop <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
