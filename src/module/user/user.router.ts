import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middleware/auth'

const userRouter = Router()

userRouter.post('/', userController.createUser)
userRouter.get('/:id', userController.getSingleUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/', auth('admin', 'user'), userController.getUser)

export default userRouter
