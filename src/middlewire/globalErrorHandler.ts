import { NextFunction, Request, Response } from 'express'
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

export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  // 1. CastError (invalid MongoDB ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err, res)
  }

  // 2. ValidationError (Mongoose)
  if (err instanceof mongoose.Error.ValidationError) {
    console.error('ValidationError:', err)
    return handleValidationError(err, res)
  }

  // 3. Duplicate Key Error
  if (err.code && err.code === 11000) {
    console.error(
      'Duplicate Key Error:',
      JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
    )
    return handleDuplicateError(err, res)
  }

  // 4. Zod validation error
  if (err instanceof ZodError) {
    console.error('ZodError:', err.errors)
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      name: 'ZodError',
      message: 'Validation Error',
      error: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    })
  }

  // 5. JWT errors
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      name: 'TokenExpiredError',
      message: 'JWT token has expired',
      error: err,
    })
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      name: 'JsonWebTokenError',
      message: 'Invalid JWT token',
      error: err,
    })
  }

  // 6. Multer file upload error
  if (err instanceof multer.MulterError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      name: 'MulterError',
      message: err.message,
      error: err,
    })
  }

  // 7. Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      name: 'AppError',
      message: err.message,
      error: err,
    })
  }

  // 8. Generic error handler
  if (err instanceof Error) {
    return handleGenericError(err, res)
  }

  // Fallback for unknown errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong!',
    error: err,
  })
}
