import mongoose from "mongoose"
import { USER_GENDER } from '@ticktuk-test/utils'

import { _IUser } from '../types/user'

const { Schema } = mongoose

const userSchema = new Schema<_IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true, enum: USER_GENDER },
    email: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true,
    minimize: true
  }
)

export default mongoose.model<_IUser>(`User`, userSchema)
