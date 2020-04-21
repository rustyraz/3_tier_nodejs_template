import mongoose from 'mongoose'
import userSchema from '../schemas/user.schema'

const User = mongoose.model('user', userSchema)

export default User
