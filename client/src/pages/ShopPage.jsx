import { useState } from 'react'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { PRODUCTS } from '../data'

const TABS = [
  { key: 'all', label: 'All Products' },
  { key: 'hair', label: 'Hair Care' },
  { key: 'skin', label: 'Skin Care' },
  { key: 'body', label: 'Body Care' },
  { key: 'wellness', label: 'Wellness' },
]

export default function ShopPage() {
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter(p => {
    const matchCat = active === 'all' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <main className="min-h-screen bg-ink" style={{ paddingTop: '100px' }}>
        {/* Header Banner */}
        <div
          className="relative py-24 flex items-center justify-center text-center overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, rgba(13,8,7,0.9) 0%, rgba(13,8,7,0.75) 100%), url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80') center/cover`
          }}
        >
          <div>
            <p className="section-label mb-3">Pure & Handcrafted</p>
            <h1 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] text-ivory">
              Our <em className="text-gold not-italic">Apothecary</em>
            </h1>
            <p className="font-cormorant text-xl italic text-ivory/60 mt-3 max-w-lg mx-auto">
              25 years of clinical expertise, bottled with care and intention.
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-16">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`px-5 py-2 rounded-full font-jost text-[0.72rem] font-semibold tracking-wider uppercase border transition-all duration-300 ${
                    active === tab.key
                      ? 'bg-crimson border-crimson text-white'
                      : 'border-gold/20 text-warmgrey hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgrey" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input pl-9 w-56"
              />
            </div>
          </div>

          {/* Result count */}
          <p className="font-jost text-xs text-warmgrey mb-8 tracking-wider">
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-cormorant text-2xl italic text-warmgrey">No products found.</p>
              <button onClick={() => { setActive('all'); setSearch('') }} className="btn-outline mt-6">
                Clear Filters
              </button>
            </div>
          )}

          {/* Info strip */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Pure Ayurvedic', desc: 'No chemicals, sulphates or synthetic preservatives. 100% traditional formulations.' },
              { icon: '🏥', title: 'Doctor Prepared', desc: 'Every product is formulated by Dr. Vrushali Maisekar based on 25+ years of clinical experience.' },
              { icon: '🚚', title: 'Pan-India Delivery', desc: 'Shipped securely across India. Razorpay-powered secure checkout coming soon.' },
            ].map(item => (
              <div key={item.title} className="bg-ink2 border border-gold/12 rounded-2xl p-6 text-center hover:border-gold/25 transition-colors duration-300">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-playfair text-base text-gold mb-2">{item.title}</h3>
                <p className="font-jost text-xs text-warmgrey leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
