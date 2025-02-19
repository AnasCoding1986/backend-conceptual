import { Request, Response } from 'express'
import { tourService } from './tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = await tourService.createTour(body)

    res.send({
      success: true,
      message: 'Tour created successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getTours = async (req: Request, res: Response) => {
  try {
    const result = await tourService.getTour()

    res.send({
      success: true,
      message: 'Tour retrived successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleTours = async (req: Request, res: Response) => {
  try {
    const id = await req.params.id
    const result = tourService.getSingleTour(id)

    res.send({
      success: true,
      message: 'Single Tour retrived successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateTours = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const result = await tourService.updateTour(id, body)

    res.send({
      success: true,
      message: 'Tour updated successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const deleteTours = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await tourService.deleteTour(id)

    res.send({
      success: true,
      message: 'Tour deleted successfully',
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const tourController = {
  createTour,
  getTours,
  getSingleTours,
  updateTours,
  deleteTours,
}
