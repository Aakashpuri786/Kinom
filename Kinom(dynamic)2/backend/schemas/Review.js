import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide reviewer name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    quote: {
      type: String,
      required: [true, 'Please provide a review quote'],
      trim: true,
      maxlength: [500, 'Quote cannot exceed 500 characters'],
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
