import { AppErrorProps } from '../@types/index'
import { Response } from 'express'

class AppError implements AppErrorProps {
  constructor(public message: string, public statusCode = 400) {}

  json(res: Response) {
    return res.status(this.statusCode).json({
      error: this.message,
      statusCode: this.statusCode
    })
  }
}

export { AppError }