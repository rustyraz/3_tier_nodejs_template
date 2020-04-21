import mongoose from 'mongoose'
import investmentSchema from '../schemas/investment'

const Investment = mongoose.model('investment', investmentSchema)

export default Investment
