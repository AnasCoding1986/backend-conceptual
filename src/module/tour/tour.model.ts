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
  // Changed from startDate to startDates to hold multiple dates.
  startDates: {
    type: [String], // Alternatively, you could use [Date] if you prefer.
  },
  location: [String],
  slug: String,
})

tourSchema.methods.getnearestStartDateAndEndDate = function () {
  const today = new Date()

  // Convert each date string to a Date object before filtering
  const futureDates = (this.startDates || [])
    .map((dateStr: string): Date => new Date(dateStr))
    .filter((date: Date): boolean => date > today)

  // Sort dates in ascending order using getTime()
  futureDates.sort((a: Date, b: Date): number => a.getTime() - b.getTime())

  // If there are no future dates, return null or handle accordingly
  if (futureDates.length === 0) {
    return null
  }

  const nearestStartDate = futureDates[0]
  const estimateEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000
  )

  return {
    nearestStartDate,
    estimateEndDate,
  }
}

const Tour = model('tour', tourSchema)

export default Tour
