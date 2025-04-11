import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

// type TErrorResponse = {
//   success: boolean
//   message: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   error: any
// }

export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof mongoose.Error.CastError) {
    console.log(err)
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      name: err.name ? err.name : '',
      message: err.message,
      error: err,
    })
  } else if (err.code && err.code === 11000) {
    console.log(err)
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      name: err.name ? err.name : '',
      message: `message is : ${err.message}`,
      error: err,
    })
  } else if (err instanceof Error) {
    console.log(err)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      name: err.name ? err.name : '',
      message: `message is : ${err.message}`,
      error: err,
    })
  }
}
