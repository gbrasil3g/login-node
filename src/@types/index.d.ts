import { Request, Response } from 'express'

export interface IRoutes {
  req: Request
  res: Response
}

export class AppErrorProps {
  constructor(public message: string, public statusCode = 400)

  json: (res: Response) => void
}

export class UserControllerProps {
  create: (req: Request, res: Response) => void
  show: (req: Request, res: Response) => void
  index: (req: Request, res: Response) => void
}