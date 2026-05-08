import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A100C',
              color: '#F5ECD7',
              border: '1px solid rgba(201,168,76,0.3)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
