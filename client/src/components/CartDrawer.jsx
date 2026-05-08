import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, removeItem, updateQty, closeCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[420px] max-w-[100vw] z-[70] flex flex-col"
            style={{ background: 'linear-gradient(to bottom, #1A100C 0%, #0D0807 100%)', borderLeft: '1px solid rgba(201,168,76,0.15)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.3)' }}>
                  <ShoppingBag size={14} className="text-crimson" />
                </div>
                <div>
                  <h3 className="font-playfair text-[1.1rem] text-ivory leading-none">Your Cart</h3>
                  <p className="font-jost text-[0.62rem] text-warmgrey/60 mt-0.5 tracking-wider">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-ivory transition-all duration-300 hover:bg-crimson hover:border-crimson"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <X size={15} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <ShoppingBag size={32} className="text-gold/25" />
                  </div>
                  <p className="font-cormorant text-xl italic text-warmgrey">Your cart awaits</p>
                  <p className="font-jost text-xs text-warmgrey/50">Add some Ayurvedic goodness</p>
                  <button onClick={closeCart} className="btn-outline py-2.5 px-6 text-xs mt-2">
                    Explore Products
                  </button>
                </motion.div>
              ) : (
                <motion.div layout className="space-y-0">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, x: 30, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex gap-4 py-4"
                        style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&q=80' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-jost text-[0.88rem] font-medium text-ivory leading-tight truncate">{item.name}</p>
                          <p className="font-jost text-[0.68rem] text-warmgrey/60 mt-0.5">{item.volume}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQty(item._id, item.qty - 1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-ivory transition-all duration-200 hover:bg-crimson"
                                style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                                <Minus size={10} />
                              </button>
                              <span className="font-jost text-sm font-medium min-w-[22px] text-center text-ivory">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item._id, item.qty + 1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-ivory transition-all duration-200 hover:bg-crimson"
                                style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                                <Plus size={10} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-playfair text-gold text-base">₹{item.price * item.qty}</span>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-warmgrey/30 hover:text-crimson transition-colors duration-200">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-5"
                  style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                  {/* Total */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="font-jost text-xs text-warmgrey/60 tracking-wider uppercase">Order Total</span>
                    </div>
                    <span className="font-playfair text-2xl text-gold">₹{totalPrice}</span>
                  </div>
                  <button className="btn-primary w-full justify-center py-4 text-[0.7rem]">
                    Proceed to Checkout →
                  </button>
                  <p className="text-center font-jost text-[0.6rem] text-warmgrey/40 mt-3 flex items-center justify-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1"/>
                      <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                    Secure payment via Razorpay
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
