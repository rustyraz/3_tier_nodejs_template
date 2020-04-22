import Router from 'express-promise-router'
import { userController } from '../controller'
import { validateParam, validateBody, schemas } from '../helpers/routeHelpers'

const router = Router()
router
  .get('/', userController.getUser)
  .get('/:id', validateParam(schemas, 'id'), userController.getUserById)
  .post('/register', validateBody(schemas.newUserSchema), userController.registerUser)
  .patch('/:id',
    [
      validateParam(schemas, 'id'),
      validateBody(schemas.patchUserSchema)
    ],
    userController.patchUserDetails)
  .delete('/:id', validateParam(schemas, 'id'), userController.deleteUserById)
  .post('/:id/investments',
    [
      validateParam(schemas, 'id'),
      validateBody(schemas.newInvestmentSchema)
    ],
    userController.newUserInvestments)
  .get('/:id/investments', validateParam(schemas, 'id'), userController.getUserInvestments)

export default router
