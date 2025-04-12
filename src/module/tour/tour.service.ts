import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payLoad: ITour) => {
  const result = await Tour.create(payLoad)
  console.log(result)
  return result
}

const getTour = async (query: Record<string, unknown>) => {
  console.log(query)
  const searchTerm = (query?.searchTerm as string) || ''

  const searchAbleFields = ['name', 'location']

  const result = await Tour.find({
    $or: searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  return result
}

const getSingleTour = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}

const updateTour = async (id: string, payLoad: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payLoad, { new: true })
  return result
}

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

const getNextSchedule = async (id: string) => {
  const tour = await Tour.findById(id)

  if (!tour) {
    throw new Error('Tour not found')
  }

  const nextSchedule = tour.getnearestStartDateAndEndDate()

  console.log(tour, nextSchedule)

  return {
    tour,
    nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
