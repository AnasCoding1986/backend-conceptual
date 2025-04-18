import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { handleGenericError } from '../helpers/handleGenericError'
import { handleDuplicateError } from '../helpers/handleDuplicateError'
import { handleCastError } from '../helpers/handleCastError'
import { handleValidationError } from '../helpers/handleValidationError'

// Optional: Custom AppError class
export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

// ✅ No need to explicitly type this as ErrorRequestHandler — just use function with 4 params
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // 1. CastError (invalid MongoDB ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res)
    return
  }

  // 2. ValidationError (Mongoose)
  if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res)
    return
  }

  // 3. Duplicate Key Error
  if (err.code && err.code === 11000) {
    handleDuplicateError(err, res)
    return
  }

  // 4. Zod validation error
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      name: 'ZodError',
      message: 'Validation Error',
      error: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    })
    return
  }

  // 5. JWT errors
  if (err instanceof jwt.TokenExpiredError) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      name: 'TokenExpiredError',
      message: 'JWT token has expired',
      error: err,
    })
    return
  }

  if (err instanceof jwt.JsonWebTokenError) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      name: 'JsonWebTokenError',
      message: 'Invalid JWT token',
      error: err,
    })
    return
  }

  // 6. Multer file upload error
  if (err instanceof multer.MulterError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      name: 'MulterError',
      message: err.message,
      error: err,
    })
    return
  }

  // 7. Custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      name: 'AppError',
      message: err.message,
      error: err,
    })
    return
  }

  // 8. Generic error handler
  if (err instanceof Error) {
    handleGenericError(err, res)
    return
  }

  // 9. Fallback for unknown errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong!',
    error: err,
  })
}
