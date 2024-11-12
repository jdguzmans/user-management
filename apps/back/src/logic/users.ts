
import { USER_GENDER } from '@ticktuk-test/utils'
import User from '../models/user'
import { IUser } from '../types/user'
import { getClient } from '../setup/cache'

const CACHE_HASH = `USERS`

export async function getAll (): Promise<IUser[]> {
  return User.find().lean()
}

interface IAddOneUserInput {
  firstname: string
  lastname: string
  gender: USER_GENDER
  email: string
  description: string
}
export async function addOne ({
  firstname,
  lastname,
  gender,
  email,
  description
}: IAddOneUserInput) : Promise<IUser[]> {
  const user = await User.create({ firstname, lastname, gender, email, description })
  const client = getClient()
  if (client !== null) {
    await client.HSET(CACHE_HASH, user._id.toString(), JSON.stringify(user))
    const users = await client.hVals(CACHE_HASH)
    return users.map(u => JSON.parse(u))
  }
  return User.find().lean()
}

export async function deleteOne (id: string): Promise<IUser[]> {
  await User.deleteOne({ _id: id })
  const client = getClient()
  if (client !== null) {
    await client.HDEL(CACHE_HASH, id)
    const users = await client.hVals(CACHE_HASH)
    return users.map(u => JSON.parse(u))
  }
  return User.find().lean()
}
