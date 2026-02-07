import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Simple auth: register + login
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      activationToken: req.user.activationToken,
    },
  })
})

export default router


