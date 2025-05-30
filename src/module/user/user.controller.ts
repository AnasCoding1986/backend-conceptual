import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUser(payload)
  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    message: 'user retrived successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  const result = await userService.getSingleUser(userId)

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    message: 'Single user retrived successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  const data = req.body
  const result = await userService.updateUser(userId, data)

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    message: 'User data updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  await userService.deleteUser(userId)

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    message: 'User data deleted successfully',
    data: [],
  })
})

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
