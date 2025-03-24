import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { bookingService } from './booking.service'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await bookingService.createBooking(body)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Booking created successfully',
    data: result,
  })
})

export const bookingController = {
  createBooking,
}
