import { Schema } from 'mongoose'
import sha256 from 'sha256'

const userSchema = new Schema({
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  name: { type: String, required: false },
  investments: [{
    type: Schema.Types.ObjectId,
    ref: 'investment'
  }]
}, { timestamps: true })

/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword (password) {
  return this.password === sha256(password)
}

export default userSchema
