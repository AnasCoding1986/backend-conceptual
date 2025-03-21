import { Request, Response } from 'express'
import { userServise } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await userServise.crateUser(payload)
    // res.json({
    //   message: 'user created successfully',
    //   data: result,
    // })
    sendResponse(res, {
      statuscode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'something wrong',
      error,
    })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServise.getUser()
    res.json({
      status: true,
      message: 'user retrived successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'something wrong',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const result = await userServise.getSingleUser(userId)
    res.json({
      status: true,
      message: 'Single user retrived successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'something wrong',
      error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const data = req.body
    const result = await userServise.updateUser(userId, data)
    res.json({
      status: true,
      message: 'User data updated successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'something wrong',
      error,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    await userServise.deleteUser(userId)
    res.json({
      status: true,
      message: 'User deleted successfully',
      result: {},
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'something wrong',
      error,
    })
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
