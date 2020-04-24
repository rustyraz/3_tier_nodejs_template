import Router from 'express-promise-router'
import { investmentController } from '../controller'
import { validateParam, validateBody, schemas } from '../helpers/routeHelpers'

const router = Router()

router
  .get('/', investmentController.getInvestments)
  .get('/:id', validateParam(schemas, 'id'), investmentController.getInvestmentById)
  .post('/', validateBody(schemas.newInvestmentSchemaWithOwner), investmentController.newInvestment)
  .patch('/:id', validateParam(schemas, 'id'), investmentController.updateInvestment)
  .delete('/:id', validateParam(schemas, 'id'), investmentController.deleteInvestment)

export default router
