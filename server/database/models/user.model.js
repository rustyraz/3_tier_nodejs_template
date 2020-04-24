import mongoose from 'mongoose'
import userSchema from '../schemas/user.schema'

const User = mongoose.model('user', userSchema)

// userSchema.pre('save', async (next) => {
//   const self = this
//   try {
//     const userData = await User.find({ email: self.email })
//     if (!userData) {
//       next()
//     } else {
//         console.log('User with that email already exists', self.email)
//       next(new Error('Email already registered'))
//     }
//   } catch (error) {
//     next(new Error('Error happened'))
//   }
// })

export default User
