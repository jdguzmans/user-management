import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import * as CONFIG from '../../config'
import router from './router'

export default async function setupPresentationLayer () {
  const app = express()

  app.use(morgan(`:status :method :url :res[content-length] - :response-time ms`, { skip: (req) => req.method === `OPTIONS` }))
  app.use(express.json({ limit: `50mb` }))
  app.use(cors())

  app.use(`/api`, router)

  return new Promise((resolve) => {
    app.listen(CONFIG.PORT, () => {
      console.log(`Server starts`)
      resolve(null)
    })
  })
}
