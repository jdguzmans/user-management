import 'dotenv/config'

import setupPresentationLayer from './setup/presentation'
import setupDb from './setup/db'
import setupCache from './setup/cache'

async function startServer () {
  await setupDb()
  await setupCache()
  await setupPresentationLayer()
}

startServer()
