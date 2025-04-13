import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payLoad: ITour) => {
  const result = await Tour.create(payLoad)
  console.log(result)
  return result
}

const getTour = async (query: Record<string, unknown>): Promise<ITour[]> => {
  const queryObj = { ...query }
  const excludingItems = ['searchTerm', 'page', 'limit', 'sortBy', 'sortOrder']
  excludingItems.forEach((item) => delete queryObj[item])

  const searchTerm = (query?.searchTerm as string) || ''
  const searchAbleFields = ['name', 'location']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const andConditions: any[] = []

  if (searchTerm) {
    andConditions.push({
      $or: searchAbleFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(queryObj).length) {
    andConditions.push(queryObj)
  }

  const finalQuery = andConditions.length > 0 ? { $and: andConditions } : {}

  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit

  let sortStr = ''
  if (query?.sortBy && query?.sortOrder) {
    sortStr = `${query.sortOrder === 'desc' ? '-' : ''}${query.sortBy}`
  }

  const result = await Tour.find(finalQuery)
    .skip(skip)
    .limit(limit)
    .sort(sortStr || '')

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
