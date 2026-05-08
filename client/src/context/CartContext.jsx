import { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

const initialState = {
  items: [],
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i._id === action.payload._id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map(i => i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i)
          .filter(i => i.qty > 0),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
    toast.success(`${product.name} added to cart`, {
      icon: '✦',
      style: {
        background: '#1A100C',
        color: '#F5ECD7',
        border: '1px solid rgba(201,168,76,0.35)',
      },
    })
    dispatch({ type: 'OPEN_CART' })
  }

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
