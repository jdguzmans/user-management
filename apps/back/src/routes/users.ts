import express, { Router } from 'express'
import * as yup from 'yup'

import { f, validate } from '@ticktuk-test/utils'

import * as logic from '../logic/users'

const router: Router = express.Router()

router.get(`/`,
  f(async function () {
    const toReturn = await logic.getAll()

    return toReturn
  })
)

router.post(`/`,
  validate({
    body: yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      gender: yup.string().required(),
      email: yup.string().required(),
      description: yup.string().max(200).required()
    })
  }),
  f(async function (req) {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const gender = req.body.gender
    const email = req.body.email
    const description = req.body.description

    const toReturn = await logic.addOne({ firstname, lastname, gender, email, description })
    return toReturn
  })
)

router.delete(`/:id`,
  validate({
    params: yup.object({
      id: yup.string().min(1).required()
    })
  }),
  f(async function (req) {
    const id = req.params.id

    const toReturn = await logic.deleteOne(id)
    return toReturn
  })
)

export default router
