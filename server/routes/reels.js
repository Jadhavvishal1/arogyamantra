import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Reel from '../models/Reel.js'

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads')

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const ADMIN_KEY = process.env.ADMIN_KEY || 'arogyamantra2025'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `reel-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.mp4', '.webm', '.mov', '.jpg', '.jpeg', '.png', '.webp']
    cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()))
  },
})

const auth = (req, res, next) => {
  const key = req.headers['x-admin-key'] || req.query.adminKey
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

// GET all reels
router.get('/reels', async (req, res) => {
  try {
    const reels = await Reel.find().sort({ order: 1, createdAt: -1 })
    res.json(reels)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// POST add reel via URL
router.post('/reels/url', auth, async (req, res) => {
  try {
    const { url, caption } = req.body
    if (!url) return res.status(400).json({ error: 'URL required' })
    const count = await Reel.countDocuments()
    const reel = await Reel.create({ type: 'url', url, caption: caption || '', order: count })
    res.json(reel)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// POST upload video/image file
router.post('/reels/upload', auth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
  try {
    const videoFile = req.files?.video?.[0]
    const thumbFile = req.files?.thumbnail?.[0]
    if (!videoFile) return res.status(400).json({ error: 'No file provided' })
    const count = await Reel.countDocuments()
    const reel = await Reel.create({
      type: 'upload',
      url: `/uploads/${videoFile.filename}`,
      thumbnail: thumbFile ? `/uploads/${thumbFile.filename}` : '',
      caption: req.body.caption || '',
      order: count,
    })
    res.json(reel)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// PATCH update caption
router.patch('/reels/:id', auth, async (req, res) => {
  try {
    const reel = await Reel.findByIdAndUpdate(req.params.id, { caption: req.body.caption }, { new: true })
    res.json(reel)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// DELETE reel
router.delete('/reels/:id', auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) return res.status(404).json({ error: 'Not found' })
    if (reel.type === 'upload') {
      const p = path.join(UPLOADS_DIR, path.basename(reel.url))
      if (fs.existsSync(p)) fs.unlinkSync(p)
      if (reel.thumbnail) {
        const tp = path.join(UPLOADS_DIR, path.basename(reel.thumbnail))
        if (fs.existsSync(tp)) fs.unlinkSync(tp)
      }
    }
    await Reel.deleteOne({ _id: req.params.id })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
