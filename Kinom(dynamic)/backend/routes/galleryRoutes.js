import express from 'express'
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js'

const router = express.Router()

// Public routes
router.get('/', getGalleryItems)
router.get('/:id', getGalleryItemById)

// Admin routes (add authentication middleware later)
router.post('/', createGalleryItem)
router.put('/:id', updateGalleryItem)
router.delete('/:id', deleteGalleryItem)

export default router
