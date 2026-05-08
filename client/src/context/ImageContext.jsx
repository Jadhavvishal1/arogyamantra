import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const ImageContext = createContext({})

export function ImageProvider({ children }) {
  const [images, setImages] = useState({})

  const fetchImages = useCallback(() => {
    fetch(`${API}/api/admin/images`)
      .then(r => r.json())
      .then(data => {
        const flat = {}
        Object.values(data).flat().forEach(img => {
          flat[img.key] = `${API}${img.url}`
        })
        setImages(flat)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchImages()
    window.addEventListener('focus', fetchImages)
    return () => window.removeEventListener('focus', fetchImages)
  }, [fetchImages])

  return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>
}

export function useAdminImage(key, fallback) {
  const images = useContext(ImageContext)
  return images[key] || fallback
}
