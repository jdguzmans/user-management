
import { USER_GENDER } from '@ticktuk-test/utils'

export interface IUser extends Document {
  _id: string
  firstname: string
  lastname: string
  gender: USER_GENDER
  email: string
  description: string
}
