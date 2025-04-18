import express, { Request, Response, NextFunction } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.router'
import bookingRouter from './module/booking/booking.route'
import authRoute from './module/auth/auth.route'
import { globalErrorHandler } from './middleware/globalErrorHandler' // ✅ renamed 'middlewire' to 'middleware'

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is running',
  })
})

// 404 Route Not Found Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  })
})

// Global Error Handler
app.use(globalErrorHandler)

export default app
