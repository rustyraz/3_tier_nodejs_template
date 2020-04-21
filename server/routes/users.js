import Router from 'express-promise-router'
import { userController } from '../controller'

const router = Router()
router
  .get('/', userController.getUser)
  .get('/:id', userController.getUserById)
  .post('/register', userController.registerUser)
  .patch('/:id', userController.patchUserDetails)
  .delete('/:id', userController.deleteUserById)
  .post('/:id/investments', userController.newUserInvestments)
  .get('/:id/investments', userController.getUserInvestments)

export default router
