import { Request, Response } from 'express'
import { userServise } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await userServise.crateUser(payload)
    res.json({
      message: 'user created successfully',
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

export const userController = {
  createUser,
}
