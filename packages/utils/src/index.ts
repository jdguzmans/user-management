
import * as yup from 'yup'
import { RequestHandler } from 'express'

export enum USER_GENDER {
  MALE = `MALE`,
  FEMALE = `FEMALE`,
  OTHER = `OTHER`
}

export enum ERROR_CODE {
  INPUT_VALIDATION = `INPUT_VALIDATION`
}

export function validate (
  { body, query, params }:
  { body?: yup.AnyObjectSchema, query?: yup.AnyObjectSchema, params?: yup.AnyObjectSchema }
): RequestHandler {
  return async function (req, res, next) {
    try {
      const schema = yup.object({
        body: body !== undefined ? body.noUnknown() : yup.object({}).noUnknown(),
        query: query !== undefined ? query.noUnknown() : yup.object({}).noUnknown(),
        params: params !== undefined ? params.noUnknown() : yup.object({}).noUnknown()
      })

      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params
      }, { strict: true })
      return next()
    } catch (err:any) {
      console.error(err)
      return res.status(400).json({ code: ERROR_CODE.INPUT_VALIDATION, type: err.name, message: err.message })
    }
  }
}

export function f (fn: RequestHandler): RequestHandler {
  return async function (req, res, next) {
    try {
      const result = await fn(req, res, next)
      if (result === undefined) {
        res.sendStatus(204)
        return
      }
      res.status(200).send(result)
    } catch (e: any) {
      if (e instanceof ClientError) {
        console.error(`Client error: ${e.code}`)
        const toSend: any = { code: e.code }
        if (e.message) toSend.message = e.message
        res.status(400).send(toSend)
        return
      }

      console.error(`Server error`)
      console.error(e)
      res.sendStatus(500)
    }
  }
}

export class ClientError extends Error {
  constructor (public code: ERROR_CODE, message?: string) {
    super(message)
  }
}
