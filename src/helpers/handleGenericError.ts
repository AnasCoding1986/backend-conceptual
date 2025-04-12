import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenericError = (err: any, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    name: err.name || 'Error',
    message: err.message || 'Something went wrong!',
    error: err,
  })
}
