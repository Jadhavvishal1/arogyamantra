import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAdminImage } from '../context/ImageContext'

export default function ProductCard({ product }) {
  const { addItem, items } = useCart()
  const [imgLoaded, setImgLoaded] = useState(false)
  const productImg = useAdminImage(`product_${product._id}`, product.image)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? 0 : null
  )

  const activeVariant = product.variants ? product.variants[selectedVariant] : null
  const displayPrice = activeVariant ? activeVariant.price : product.price
  const displaySize = activeVariant ? activeVariant.size : (product.volume || '')

  // Cart key includes variant so same product in different sizes adds separately
  const cartId = product.variants ? `${product._id}-${selectedVariant}` : product._id
  const cartProduct = { ...product, _id: cartId, price: displayPrice, volume: displaySize, name: product.name }
  const inCart = items.some(i => i._id === cartId)

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.3)' }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col rounded-[1.4rem] overflow-hidden border transition-all duration-400"
      style={{
        background: 'linear-gradient(to bottom, #1A100C, #0D0807)',
        borderColor: 'rgba(201,168,76,0.1)',
      }}>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: '#1A100C' }}>
        {!imgLoaded && <div className="absolute inset-0 img-shimmer" />}
        <img
          src={productImg}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-108 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'scale(1.02)' }}
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80'; setImgLoaded(true) }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,8,7,0.8) 0%, transparent 60%)' }} />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="font-jost text-[0.58rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full text-ink"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E5C97A)' }}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute top-3 right-3">
          <span className="font-jost text-[0.55rem] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded"
            style={{ background: 'rgba(13,8,7,0.75)', backdropFilter: 'blur(4px)', color: 'rgba(154,143,133,0.8)', border: '1px solid rgba(201,168,76,0.15)' }}>
            {product.category}
          </span>
        </div>

        {/* Quick-add hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(13,8,7,0.5)', backdropFilter: 'blur(2px)' }}>
          <button
            onClick={() => addItem(cartProduct)}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 font-jost text-[0.72rem] font-semibold tracking-wider text-white shadow-lg transition-all duration-200 hover:scale-105"
            style={{ background: '#8B1A1A', border: '1px solid rgba(201,168,76,0.3)' }}>
            <ShoppingBag size={13} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-playfair text-[1rem] font-medium text-ivory mb-1.5 leading-tight group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-jost text-[0.78rem] text-warmgrey leading-[1.65] mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Benefits pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits?.slice(0, 3).map(b => (
            <span key={b} className="font-jost text-[0.55rem] tracking-wider px-2 py-0.5 rounded"
              style={{ background: 'rgba(74,103,65,0.15)', border: '1px solid rgba(74,103,65,0.3)', color: 'rgba(107,149,96,0.9)' }}>
              {b}
            </span>
          ))}
        </div>

        {/* Variant Selector */}
        {product.variants && (
          <div className="mb-4">
            <p className="font-jost text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-warmgrey/60 mb-2">Select Size</p>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(idx)}
                  className="font-jost text-[0.65rem] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 border"
                  style={{
                    background: selectedVariant === idx ? 'rgba(139,26,26,0.9)' : 'rgba(201,168,76,0.05)',
                    borderColor: selectedVariant === idx ? 'rgba(139,26,26,0.8)' : 'rgba(201,168,76,0.2)',
                    color: selectedVariant === idx ? 'white' : 'rgba(201,168,76,0.7)',
                  }}>
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div>
            <span className="font-playfair text-[1.4rem] font-medium text-gold leading-none">₹{displayPrice}</span>
            <span className="font-jost text-[0.6rem] text-warmgrey/60 ml-1.5">{displaySize}</span>
          </div>
          <button
            onClick={() => addItem(cartProduct)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.68rem] font-semibold tracking-wider font-jost transition-all duration-300 border"
            style={{
              background: inCart ? 'rgba(74,103,65,0.9)' : 'rgba(139,26,26,0.9)',
              borderColor: inCart ? 'rgba(74,103,65,0.8)' : 'rgba(139,26,26,0.8)',
              color: 'white',
            }}>
            {inCart ? <><Check size={11} /> Added</> : <><ShoppingBag size={11} /> Add</>}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
