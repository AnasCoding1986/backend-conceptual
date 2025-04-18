import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
  },
  userStatus: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
    required: true,
  },
})

userSchema.pre('save', async function (next) {
  const user = this as IUser
  user.password = await bcrypt.hash(user.password, Number(config.salt))
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

const User = model<IUser>('User', userSchema)
export default User
