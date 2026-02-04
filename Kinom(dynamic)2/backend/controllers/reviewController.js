import Review from '../schemas/Review.js'

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 })

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      res.status(404)
      throw new Error('Review not found')
    }

    res.json({
      success: true,
      data: review,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create review
// @route   POST /api/reviews
// @access  Private (admin)
export const createReview = async (req, res, next) => {
  try {
    const { name, title, quote, avatarUrl, rating } = req.body

    if (!name || !quote) {
      res.status(400)
      throw new Error('Please provide name and quote')
    }

    const review = await Review.create({
      name,
      title,
      quote,
      avatarUrl,
      rating,
    })

    res.status(201).json({
      success: true,
      message: 'Review created',
      data: review,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (admin)
export const updateReview = async (req, res, next) => {
  try {
    const { name, title, quote, avatarUrl, rating, isActive } = req.body

    const review = await Review.findById(req.params.id)

    if (!review) {
      res.status(404)
      throw new Error('Review not found')
    }

    review.name = name || review.name
    review.title = title !== undefined ? title : review.title
    review.quote = quote || review.quote
    review.avatarUrl = avatarUrl !== undefined ? avatarUrl : review.avatarUrl
    review.rating = rating || review.rating
    review.isActive = isActive !== undefined ? isActive : review.isActive

    await review.save()

    res.json({
      success: true,
      message: 'Review updated',
      data: review,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (admin)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      res.status(404)
      throw new Error('Review not found')
    }

    await review.deleteOne()

    res.json({
      success: true,
      message: 'Review deleted',
    })
  } catch (error) {
    next(error)
  }
}
