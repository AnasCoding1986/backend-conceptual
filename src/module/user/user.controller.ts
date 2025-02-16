import { Request, Response } from 'express'
import User from './user.model'

const createUser = async (req: Request, res: Response) => {
  const payload = req.body
  const result = User.create(payload)
  res.json({
    message: 'user created successfully',
    data: result,
  })
}

export const userController = {
  createUser,
}
