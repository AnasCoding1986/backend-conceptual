import { model, Schema } from 'mongoose'

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  image: [String],
  startDate: {
    type: String,
  },
  location: [String],
  slug: String,
})

const Tour = model('tour', tourSchema)

export default Tour
