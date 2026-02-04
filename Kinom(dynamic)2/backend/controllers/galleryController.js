import Gallery from '../schemas/Gallery.js'

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res, next) => {
  try {
    const items = await Gallery.find({ isActive: true }).sort({ createdAt: -1 })

    res.json({
      success: true,
      count: items.length,
      data: items,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryItemById = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (!item) {
      res.status(404)
      throw new Error('Gallery item not found')
    }

    res.json({
      success: true,
      data: item,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private (admin)
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, date, imageUrl, description } = req.body

    if (!title || !date || !imageUrl) {
      res.status(400)
      throw new Error('Please provide title, date, and imageUrl')
    }

    const item = await Gallery.create({
      title,
      date,
      imageUrl,
      description,
    })

    res.status(201).json({
      success: true,
      message: 'Gallery item created',
      data: item,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private (admin)
export const updateGalleryItem = async (req, res, next) => {
  try {
    const { title, date, imageUrl, description, isActive } = req.body

    const item = await Gallery.findById(req.params.id)

    if (!item) {
      res.status(404)
      throw new Error('Gallery item not found')
    }

    item.title = title || item.title
    item.date = date || item.date
    item.imageUrl = imageUrl || item.imageUrl
    item.description = description !== undefined ? description : item.description
    item.isActive = isActive !== undefined ? isActive : item.isActive

    await item.save()

    res.json({
      success: true,
      message: 'Gallery item updated',
      data: item,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (admin)
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (!item) {
      res.status(404)
      throw new Error('Gallery item not found')
    }

    await item.deleteOne()

    res.json({
      success: true,
      message: 'Gallery item deleted',
    })
  } catch (error) {
    next(error)
  }
}
