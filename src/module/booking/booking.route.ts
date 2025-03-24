import express from 'express'
import { bookingController } from './booking.controller'

const bookingRouter = express.Router()

bookingRouter.post('/', bookingController.createBooking)

export default bookingRouter
