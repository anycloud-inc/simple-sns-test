import axios from 'axios'

const baseURL = process.env.API_URL
const validateStatus = (status: number) => status >= 200 && status < 500
const api = axios.create({ baseURL, validateStatus })
api.defaults.headers.common['Content-Type'] = 'application/json'

export default api
