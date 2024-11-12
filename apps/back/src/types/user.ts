import { USER_GENDER } from '@ticktuk-test/utils'
import { FlattenMaps, Types } from "mongoose"

export interface _IUser {
  firstname: string
  lastname: string
  gender: USER_GENDER
  email: string
  description: string
}

export type IUser = FlattenMaps<_IUser> & {
  _id: Types.ObjectId;
}
