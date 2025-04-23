import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../module/user/user.model'

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const decoded = jwt.verify(token, 'secret') as JwtPayload
    const { email } = decoded

    const user = await User.findOne({ email })

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }

    req.user = decoded
    next()
  })
}

export default auth
