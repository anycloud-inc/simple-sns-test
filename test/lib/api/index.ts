import axios from 'axios'
import { addAuthorizationHeader } from './request'

const baseURL = process.env.API_URL
const validateStatus = (status: number) => status >= 200 && status < 500
const api = axios.create({ baseURL, validateStatus })
api.defaults.headers.common['Content-Type'] = 'application/json'
api.interceptors.request.use(addAuthorizationHeader)

export default api
