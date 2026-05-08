import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer disk storage — save to server/uploads/
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    // Strip path separators from original name for safety
    const safeName = file.originalname.replace(/[/\\]/g, '_')
    cb(null, `${Date.now()}-${safeName}`)
  },
})

// Only allow image MIME types
const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeOk = allowedTypes.test(file.mimetype)
  if (extOk && mimeOk) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed: jpg, jpeg, png, webp'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
})

export default upload
