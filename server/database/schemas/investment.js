import { Schema } from 'mongoose'

const investmentSchema = new Schema({
  name: { type: String, required: true },
  initialCapital: { type: Number, min: 0, default: 0, required: true },
  profit: { type: Number, min: 0, default: 0 },
  description: String,
  photoUrl: String,
  completed: { type: Boolean, default: false },
  completionDate: { type: Date },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true })

export default investmentSchema
