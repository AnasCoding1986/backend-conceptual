import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { Ibooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payLoad: Ibooking) => {
  // const { user, tour, bookedSlots } = payLoad
  // const requiredTour = await Tour.findById(tour)
  // if (!requiredTour) {
  //   throw new Error('Tour not found')
  // }
  // const totalPrice = requiredTour.price * bookedSlots

  // payLoad.totalPrice = totalPrice
  // payLoad.bookingStatus = 'pending'

  // if (requiredTour.availableSeats < bookedSlots) {
  //   throw new Error('Not enough seats available')
  // }

  // const booking = await Booking.create(payLoad)
  // console.log(booking)

  // const updatedTour = await Tour.findByIdAndUpdate(
  //   tour,
  //   {
  //     $inc: { availableSeats: -bookedSlots },
  //   },
  //   { new: true }
  // )

  // if (!updatedTour) {
  //   throw new Error('Failed to update tour')
  // }

  // return booking
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { tour, bookedSlots } = payLoad
    const requiredTour = await Tour.findById(tour)
    if (!requiredTour) {
      throw new Error('Tour not found')
    }
    const totalPrice = requiredTour.price * bookedSlots

    payLoad.totalPrice = totalPrice
    payLoad.bookingStatus = 'pending'

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available')
    }

    const booking = await Booking.create([payLoad], { session })
    console.log(booking)

    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: { availableSeats: -bookedSlots },
      },
      { new: true }
    )

    if (!updatedTour) {
      throw new Error('Failed to update tour')
    }

    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const bookingService = {
  createBooking,
}
