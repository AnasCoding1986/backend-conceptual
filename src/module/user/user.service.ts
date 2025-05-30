import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const existingUser = await User.findOne({ email: payload.email })
  if (existingUser) {
    throw new Error('Email already exists')
  }
  payload.role = 'user'
  const result = await User.create(payload)
  return result
}

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const userService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
