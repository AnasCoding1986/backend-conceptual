import { NextFunction, Request, RequestHandler, Response } from 'express'

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error))
  }
}

export default catchAsync

// catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const payload = req.body
//     const result = await userServise.crateUser(payload)
//     sendResponse(res, {
//       statuscode: StatusCodes.CREATED,
//       message: 'User created successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// })
