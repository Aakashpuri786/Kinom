import Contact from '../schemas/Contact.js'

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400)
      throw new Error('Please provide name, email, and message')
    }

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      message,
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (admin)
export const getContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query

    const query = {}
    if (status) query.status = status

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (admin)
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      res.status(404)
      throw new Error('Contact not found')
    }

    res.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (admin)
export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      res.status(404)
      throw new Error('Contact not found')
    }

    contact.status = status || contact.status
    await contact.save()

    res.json({
      success: true,
      message: 'Contact status updated',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (admin)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      res.status(404)
      throw new Error('Contact not found')
    }

    await contact.deleteOne()

    res.json({
      success: true,
      message: 'Contact deleted',
    })
  } catch (error) {
    next(error)
  }
}
