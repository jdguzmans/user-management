import axios from 'axios'

import * as CONFIG from '../../config'

const axiosInstance = axios.create({
  baseURL: `${CONFIG.API_URL}/api`
})

export default axiosInstance
