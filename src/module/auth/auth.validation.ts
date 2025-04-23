import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password lagbe' }).min(6).max(20),
})

const forgetPassValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPassValidationSchema,
}
