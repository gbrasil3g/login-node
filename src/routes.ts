import { Router } from 'express'
import { UsersController } from '@controllers/UsersController'

const router = Router()
const usersController = new UsersController()

router.post('/users', usersController.create)
router.get('/users', usersController.show)
router.get('/users', usersController.index)

export { router }