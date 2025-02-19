import { Router } from 'express'
import { tourController } from './tour.controller'

const tourRouter = Router()

tourRouter.get('/:id', tourController.getSingleTours)
tourRouter.get('/', tourController.getTours)
tourRouter.post('/', tourController.createTour)
tourRouter.put('/:id', tourController.updateTours)
tourRouter.delete('/:id', tourController.deleteTours)

export default tourRouter
