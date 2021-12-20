import api from '../lib/api'

interface CreateParams {
  name: string
  email: string
  password: string
}
export const accountRepository = {
  async create(params: CreateParams) {
    return await api.post('/account', { ...params })
  },
}
