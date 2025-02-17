import { Request, Response } from 'express'
import User from './user.model'

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = User.create(payload)
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
