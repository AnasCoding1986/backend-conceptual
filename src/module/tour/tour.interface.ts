import { Model } from 'mongoose'

export interface ITour {
  name: string
  durationHours: number
  averageRating: number
  price: number
  coverImage: string
  image?: string[]
  startDates?: Date[]
  location?: string[]
  slug?: string
}

export interface ITourMethods {
  getnearestStartDateAndEndDate(): {
    nearestStartDate: Date | null
    estimateEndDate: Date | null
  }
}

type TTourModel = Model<ITour, Record<string, unknown>, ITourMethods>

export default TTourModel
