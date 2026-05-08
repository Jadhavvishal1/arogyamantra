import mongoose from 'mongoose'

const reelSchema = new mongoose.Schema({
  type: { type: String, enum: ['upload', 'url'], required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Reel', reelSchema)
