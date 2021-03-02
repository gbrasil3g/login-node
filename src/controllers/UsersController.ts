import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '@repositories/UsersRepository'
import { UserControllerProps } from '../@types/index'
import { Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import * as yup from 'yup'

class UsersController implements UserControllerProps {
  async index(req: Request, res: Response) {
    try {
      let { u } = req.query

      u = String(u)

      const usersRepository = getCustomRepository(UsersRepository)

      const user = usersRepository.findOne({ id: u })

      if(!user) {
        throw new AppError(`No user with ID ${u} fouded`).json(res)
      }

      return res.json(user)

    } catch(err) {
      console.log(err)
    }
  }

  async show(req: Request, res: Response) {
    try { 
      const usersRepository = getCustomRepository(UsersRepository)

      const users = await usersRepository.find()

      if(!users) {
        throw new AppError('No user found').json(res)
      }

      return res.json(users)
    } catch(error) {
      console.log(error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
      })

      try {
        await schema.validate(req.body, { abortEarly: false })
      } catch(err) {
        throw new AppError(err).json(res)
      }

      const { name, email, password } = req.body 

      const usersRepository = getCustomRepository(UsersRepository)

      const userAlreadyExists = await usersRepository.findOne({ email })

      if(userAlreadyExists) {
        throw new AppError(`Email ${email} is already registered`, 400).json(res)
      }

      const user = usersRepository.create({ name, email, password })

      await usersRepository.save(user)

      return res.status(201).json(user)
    } catch(error) {
      console.log(error)
    }
  }
}

export { UsersController }