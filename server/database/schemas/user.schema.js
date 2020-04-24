import { Schema } from 'mongoose'
import sha256 from 'sha256'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

const userSchema = new Schema({
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, index: true, unique: 'Email already registered' },
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

userSchema.plugin(beautifyUnique)

export default userSchema
