import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import SiteImage from '../models/SiteImage.js'

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads')

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const ADMIN_KEY = process.env.ADMIN_KEY || 'arogyamantra2025'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, allowed.includes(ext))
  },
})

const auth = (req, res, next) => {
  const key = req.headers['x-admin-key'] || req.query.adminKey
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

// GET all images grouped by section
router.get('/admin/images', async (req, res) => {
  try {
    const images = await SiteImage.find().sort({ section: 1, key: 1 })
    const grouped = {}
    images.forEach(img => {
      if (!grouped[img.section]) grouped[img.section] = []
      grouped[img.section].push(img)
    })
    res.json(grouped)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// GET images by section
router.get('/admin/images/:section', async (req, res) => {
  try {
    const images = await SiteImage.find({ section: req.params.section })
    res.json(images)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// POST upload new image
router.post('/admin/images', auth, upload.single('image'), async (req, res) => {
  try {
    const { section, key, altText } = req.body
    if (!section || !key) return res.status(400).json({ error: 'section and key required' })
    if (!req.file) return res.status(400).json({ error: 'No image file provided' })

    const url = `/uploads/${req.file.filename}`

    // Delete old file if key exists
    const existing = await SiteImage.findOne({ key })
    if (existing) {
      const oldPath = path.join(UPLOADS_DIR, path.basename(existing.url))
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      await SiteImage.deleteOne({ key })
    }

    const img = await SiteImage.create({
      section, key, url,
      altText: altText || '',
      originalName: req.file.originalname,
      updatedAt: new Date(),
    })
    res.json(img)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// DELETE image by key
router.delete('/admin/images/:key', auth, async (req, res) => {
  try {
    const img = await SiteImage.findOne({ key: req.params.key })
    if (!img) return res.status(404).json({ error: 'Not found' })
    const filePath = path.join(UPLOADS_DIR, path.basename(img.url))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    await SiteImage.deleteOne({ key: req.params.key })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
