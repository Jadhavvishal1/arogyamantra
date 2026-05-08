import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).json({ success: true, data: order })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.product')
    res.json({ success: true, count: orders.length, data: orders })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
