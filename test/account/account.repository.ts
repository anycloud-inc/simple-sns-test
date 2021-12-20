import api from '../api'

interface CreateParams {
  name: string
  email: string
  password: string
}
export const accountRepository = {
  async create(params: CreateParams) {
    const { data } = await api.post('/account', { ...params })
    return data.user
  },
}
