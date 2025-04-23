import { Router } from 'express'
import { AuthController } from './authController'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'

const authRoute = Router()

authRoute.post('/register', AuthController.register)
authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
)
authRoute.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPassValidationSchema),
  AuthController.forgetPassword
)
// authRoute.post('/login', AuthController.login)

export default authRoute
