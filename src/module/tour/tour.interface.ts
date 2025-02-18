export interface ITour {
  name: string
  durationHours: number
  averageRating: number
  price: number
  coverImage: string
  image?: string[]
  startDate?: string
  location?: string[]
  slug?: string
}
