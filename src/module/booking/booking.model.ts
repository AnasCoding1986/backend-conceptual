import { model, Schema } from 'mongoose'
import { Ibooking } from './booking.interface'

const bookingSchema = new Schema<Ibooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    bookedSlots: {
      type: Number,
      required: true,
      min: 1,
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Booking = model<Ibooking>('Booking', bookingSchema)

export default Booking
