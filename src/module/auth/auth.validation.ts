import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password lagbe' }).min(6).max(20),
})

const forgetPassValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
})

const resetPassValidationSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  token: z.string({ required_error: 'Token is required' }),
  password: z.string({ required_error: 'Password is required' }).min(6).max(20),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPassValidationSchema,
  resetPassValidationSchema,
}
