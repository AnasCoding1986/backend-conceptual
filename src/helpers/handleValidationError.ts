import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleValidationError = (err: any, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      path: item.path,
      message: item.message,
    }
  })

  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    issues,
    message: err.message || 'Something went wrong!',
    error: err,
  })
}
