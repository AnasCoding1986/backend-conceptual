import { Response } from 'express'

type TSuccessResponse<T> = {
  status?: boolean
  statuscode: number
  message: string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statuscode).json({
    status: true,
    statuscode: data.statuscode,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
