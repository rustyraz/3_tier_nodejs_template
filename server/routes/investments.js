import Router from 'express-promise-router'
import { investmentController } from '../controller'
import { validateParam, validateBody, schemas } from '../helpers/routeHelpers'

const router = Router()

router
  .get('/', investmentController.getInvestments)
  .get('/:id', validateParam(schemas, 'id'), investmentController.getInvestmentById)

export default router
