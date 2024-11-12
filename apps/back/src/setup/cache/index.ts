import * as CONFIG from '../../config'
import { createClient } from 'redis'

let client: ReturnType<typeof createClient> | null = null

export default async function setupRedisClient () {
  try {
    client = await createClient({ url: CONFIG.REDIS_URL })
      .on(`error`, err => console.log(`Redis Client Error`, err))
      .connect()
    console.log(`Connected to caché`)
  } catch (e) {
    console.error(`Could not connect to caché`, e)
  }
}

export function getClient () {
  return client
}
