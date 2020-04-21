import Router from 'express-promise-router'

import { homeController } from '../controller'

const router = Router()

router
  .get('/', homeController.index)

export default router
