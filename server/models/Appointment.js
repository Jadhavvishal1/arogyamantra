import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  service: { type: String, required: true },
  preferredDate: { type: Date },
  message: { type: String, trim: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true })

export default mongoose.model('Appointment', appointmentSchema)
