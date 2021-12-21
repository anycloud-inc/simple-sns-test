import api from '../lib/api'

interface CreateParams {
  name: string
  email: string
  password: string
}

interface SigninParams {
  email: string
  password: string
}
export const accountRepository = {
  async create(params: CreateParams) {
    return await api.post('/account', { ...params })
  },

  async signin(params: SigninParams) {
    return await api.post('/auth', { ...params })
  },
}
