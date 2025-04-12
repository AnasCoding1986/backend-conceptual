import { Request, Response } from 'express'
import { tourService } from './tour.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'

const createTour = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await tourService.createTour(body)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Tour created successfully',
    data: result,
  })
})

const getTours = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.getTour(req.query)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Tour retrived successfully',
    data: result,
  })
})

const getSingleTours = catchAsync(async (req: Request, res: Response) => {
  const id = await req.params.id
  const result = tourService.getSingleTour(id)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Single tour retrived successfully',
    data: result,
  })
})

const getNextTourSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = await req.params.id
  const result = tourService.getNextSchedule(id)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Next tour schedule retrived successfully',
    data: result,
  })
})

const updateTours = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body
  const result = await tourService.updateTour(id, body)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Tour updated successfully',
    data: result,
  })
})

const deleteTours = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  await tourService.deleteTour(id)

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'Tour deleted successfully',
    data: {},
  })
})

export const tourController = {
  createTour,
  getTours,
  getSingleTours,
  updateTours,
  deleteTours,
  getNextTourSchedule,
}
