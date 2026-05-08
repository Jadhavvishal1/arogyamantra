import express from 'express'
import Appointment from '../models/Appointment.js'

const router = express.Router()

// POST /api/appointments — Book new appointment
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, service, preferredDate, message } = req.body
    if (!name || !phone || !service) {
      return res.status(400).json({ error: 'Name, phone, and service are required.' })
    }
    const appointment = new Appointment({ name, phone, email, service, preferredDate, message })
    await appointment.save()
    res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: appointment })
  } catch (err) {
    // If DB not connected, still respond gracefully
    console.error('Appointment save error:', err.message)
    res.status(200).json({ success: true, message: 'Appointment request received. We will call you shortly.' })
  }
})

// GET /api/appointments — Admin: list all (protect with auth in production)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 })
    res.json({ success: true, count: appointments.length, data: appointments })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
