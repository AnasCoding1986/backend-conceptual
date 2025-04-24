import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body)

  sendResponse(res, {
    status: true,
    statuscode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    status: true,
    statuscode: StatusCodes.CREATED,
    message: 'User created successfully',
    token: result.token,
    data: result.verifiedUser,
  })
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await AuthService.forgetPassword(req.body)

  sendResponse(res, {
    status: true,
    statuscode: StatusCodes.CREATED,
    message: 'Reset password link sent successfully',
    data: null,
  })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { id, token, password } = req.body

  console.log(
    'id',
    id,
    'token',
    token,
    'password',
    password,
    'req.body',
    req.body
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await AuthService.resetPassword(
    id as string,
    token as string,
    password
  )

  sendResponse(res, {
    status: true,
    statuscode: StatusCodes.CREATED,
    message: 'Password reset successfully',
    data: null,
  })
})

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
}
