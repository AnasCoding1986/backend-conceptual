import express, { Request, Response, NextFunction } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.router'
import bookingRouter from './module/booking/booking.route'
import { globalErrorHandler } from './middlewire/globalErrorHandler'

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server is running',
  })
})

// 404 Not Found middleware
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

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

export default app
