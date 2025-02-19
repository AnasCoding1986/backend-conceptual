import { IUser } from '../user/user.interface'
import Tour from './tour.model'

const createTour = async (payLoad: IUser) => {
  const result = await Tour.create(payLoad)
  return result
}

const getTour = async () => {
  const result = await Tour.find()
  return result
}

const getSingleTour = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}

const updateTour = async (id: string, payLoad: Partial<IUser>) => {
  const result = await Tour.findByIdAndUpdate(id, payLoad)
  return result
}

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}
export const tourService = {
  createTour,
  getTour,
  getSingleTour,
  updateTour,
  deleteTour,
}
