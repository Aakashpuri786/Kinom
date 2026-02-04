import express from 'express'
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'

const router = express.Router()

// Public routes
router.get('/', getReviews)
router.get('/:id', getReviewById)

// Admin routes (add authentication middleware later)
router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router
