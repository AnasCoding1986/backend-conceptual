import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILogin } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password')
  if (!user) {
    throw new Error('User not found')
  }
  const userStatus = user?.userStatus
  if (userStatus === 'inActive') {
    throw new Error('User is not active')
  }
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatch) {
    throw new Error('Password is incorrect')
  }
  const token = jwt.sign({ email: user.email, role: user.role }, 'secret', {
    expiresIn: '1d',
  })
  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }
  return { token, verifiedUser }
}

export const AuthService = {
  register,
  login,
}
