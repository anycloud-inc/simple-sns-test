import axios from 'axios'

const baseURL = process.env.API_URL
const api = axios.create({ baseURL })
api.defaults.headers.common['Content-Type'] = 'application/json'

export default api
