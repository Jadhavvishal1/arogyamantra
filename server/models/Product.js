import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  volume: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ['hair', 'skin', 'body', 'wellness'] },
  badge: { type: String },
  image: { type: String },
  description: { type: String },
  benefits: [String],
  inStock: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
