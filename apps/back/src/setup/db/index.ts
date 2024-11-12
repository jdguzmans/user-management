
import * as CONFIG from '../../config'
import mongoose from 'mongoose'

export default async function setupDb () {
  try {
    const connection = await mongoose.connect(CONFIG.MONGODB_URI)
    console.log(`Connected to DB`)

    return connection
  } catch (e:any) {
    console.error(`Can not connect to DB -> ${e.message}`)
    throw e
  }
}
