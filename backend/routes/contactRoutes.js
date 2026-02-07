import express from 'express'
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js'

const router = express.Router()

// Public route - submit contact form
router.post('/', submitContact)

// Admin routes (add authentication middleware later)
router.get('/', getContacts)
router.get('/:id', getContactById)
router.put('/:id', updateContactStatus)
router.delete('/:id', deleteContact)

export default router
