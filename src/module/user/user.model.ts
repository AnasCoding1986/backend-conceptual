import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>({
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
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
  },
  userStatus: {
    type: String,
    enum: ['active', 'inActive'], // <-- use array here
    required: true,
  },
})

// pre hook

// userSchema.pre('find', function (this, next) {
//   this.find({ userStatus: { $ne: 'active' } })
//   next()
// })

// post hook

// userSchema.post('find', function (docs, next) {
//   docs.foreach((doc: IUser) => {
//     doc.name = doc.name.toUpperCase()
//   })
//   next()
// })

const User = model<IUser>('User', userSchema)

export default User
