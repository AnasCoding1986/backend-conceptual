import { Router } from 'express'
import { userController } from './user.controller'

const userRouter = Router()

userRouter.post('/', userController.createUser)
userRouter.get('/:id', userController.getSingleUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter
