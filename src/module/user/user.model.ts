import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: String,
  role: {
    type: String,
    required: true,
  },
  userStatus: {
    type: String,
    required: true,
  },
})

const User = model('User', userSchema)

export default User
