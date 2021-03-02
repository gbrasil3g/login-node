import 'reflect-metadata'
import cors from 'cors'
import Express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'
import createConnetion from './database'
import { AppError } from './errors/AppError'

createConnetion()
const app = Express()

app.use(cors())
app.use(Express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return err.json(res)
  }

  return res.status(500).json({
    status: 'Error',
    message: `Internal Server Error ${err.message}`
  })
})

export { app }