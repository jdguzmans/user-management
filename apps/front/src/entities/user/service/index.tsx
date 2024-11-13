
import { USER_GENDER } from '@ticktuk-test/utils'
import axios from '../../../modules/axios'
import { IUser } from '../types'

const PATH = `users`

interface IAddUserInput {
  firstname: string
  lastname: string
  gender: USER_GENDER
  email: string
  description: string
}
export async function addUser ({ firstname, lastname, gender, email, description }: IAddUserInput):
 Promise<IUser[]> {
  const response = await axios({
    method: `post`,
    url: `/${PATH}`,
    data: {
      firstname,
      lastname,
      gender,
      email,
      description
    }
  })

  return response.data
}

export async function getUsers (): Promise<IUser[]> {
  const response = await axios({
    method: `get`,
    url: `/${PATH}`
  })

  return response.data
}

export async function deleteUser (
  id: string
): Promise<IUser[]> {
  const response = await axios({
    method: `delete`,
    url: `/${PATH}/${id}`
  })

  return response.data
}
