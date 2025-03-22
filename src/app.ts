import express, { NextFunction, Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.router'
import { StatusCodes } from 'http-status-codes'
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server is running',
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  console.log('Error from app.ts', error)
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ success: false, message: error.message, error })
})

export default app
