import mongoose from 'mongoose'

const SiteImageSchema = new mongoose.Schema({
  section: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  altText: { type: String, default: '' },
  originalName: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model('SiteImage', SiteImageSchema)
